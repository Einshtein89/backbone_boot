package com.nixsolutions.backbone_boot.service;

import com.nixsolutions.backbone_boot.entity.User;

import java.util.List;

public interface UserService {
    User findByFirstNameAndLastName(String firstName, String lastName);
    User findByEmail(String email);
    User saveUser(User user, boolean isUpdatePassword);
    void deleteByCheckboxes(List<Long> ids);
}
