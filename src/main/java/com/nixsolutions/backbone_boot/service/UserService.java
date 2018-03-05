package com.nixsolutions.backbone_boot.service;

import com.nixsolutions.backbone_boot.entity.User;

public interface UserService {
    User findByFirstNameAndLastName(String firstName, String lastName);
    User findByEmail(String email);
    public User saveUser(User user);
}
