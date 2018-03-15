package com.nixsolutions.backbone_boot.service;

import com.nixsolutions.backbone_boot.dao.RoleRepository;
import com.nixsolutions.backbone_boot.dao.UserRepository;
import com.nixsolutions.backbone_boot.entity.Role;
import com.nixsolutions.backbone_boot.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

import static com.nixsolutions.backbone_boot.config.Constants.ADMIN_ROLE;
import static com.nixsolutions.backbone_boot.config.Constants.USER_ROLE;

@Service("userService")
public class UserServiceImpl implements UserService
{

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public User findByFirstNameAndLastName(String firstName, String lastName)
  {
    return userRepository.findByFirstNameAndLastName(firstName, lastName);
  }

  @Override
  public User findByEmail(String email)
  {
    return userRepository.findByEmail(email);
  }

  @Override
  public User saveUser(User user, boolean isUpdatePassword)
  {
    if (isUpdatePassword)
    {
      user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    }
    user.setActive(1);
    if (Objects.isNull(user.getRoles()))
    {
      Role userRole = roleRepository.findByRole(USER_ROLE);
      user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
    }

    User savedUser = userRepository.save(user);
    return savedUser;
  }

  @Override
  public void deleteByCheckboxes(List<Long> ids)
  {
    for (Long id : ids)
    {
      userRepository.delete(id);
    }
  }

}
