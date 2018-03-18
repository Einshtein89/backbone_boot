package com.nixsolutions.backbone_boot.controller;

import java.util.List;
import java.util.Objects;

import com.nixsolutions.backbone_boot.entity.User;
import com.nixsolutions.backbone_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nixsolutions.backbone_boot.dao.UserRepository;

@Controller
@RequestMapping("/users")
public class DaoController {
    @Autowired
    private UserRepository repository;
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = repository.findOne(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = (List<User>) repository.findAll();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
    @PostMapping("")
    public ResponseEntity<User> addUser(@RequestBody User newUser) {
        User oldUserByNames =
            repository.findByFirstNameAndLastName(newUser.getFirstName(), newUser.getLastName());
        User oldUserByEmail =
                repository.findByEmail(newUser.getEmail());
        if (Objects.nonNull(oldUserByNames) || Objects.nonNull(oldUserByEmail))
        {
            return new ResponseEntity<User>(newUser, HttpStatus.CONFLICT);
        }
        User user = userService.saveUser(newUser, true);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    @PutMapping("")
    public ResponseEntity<User> updateUser(@RequestBody User newUser) {
        if (newUser.getId() <= 0)
        {
            return new ResponseEntity<User>(newUser, HttpStatus.NO_CONTENT);
        }
        User oldUser = repository.findOne(newUser.getId());
        if (oldUser == null)
        {
            return new ResponseEntity<User>(newUser, HttpStatus.BAD_REQUEST);
        }
        if (oldUser.getPassword().equals(newUser.getPassword()))
        {
            userService.saveUser(newUser, false);
        }
        else
        {
            userService.saveUser(newUser, true);
        }
        return new ResponseEntity<User>(newUser, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        repository.delete(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}