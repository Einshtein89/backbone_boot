package com.nixsolutions.backbone_boot.dao;


import java.util.List;

import com.nixsolutions.backbone_boot.entity.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {
  User findByFirstNameAndLastName(String firstName, String lastName);
}
