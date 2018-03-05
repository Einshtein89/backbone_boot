//package com.nixsolutions.backbone_boot.dao;
//
//import com.nixsolutions.backbone_boot.entity.Role;
//import com.nixsolutions.backbone_boot.entity.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import java.util.Arrays;
//import java.util.HashSet;
//
//public class UserRepositoryImpl implements UserRepository {
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    public User saveUser(User user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        user.setActive(1);
//        Role userRole = roleRepository.findByRole("ADMIN");
//        user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
//        userRepository.save(user);
//        return user;
//    }
//}
