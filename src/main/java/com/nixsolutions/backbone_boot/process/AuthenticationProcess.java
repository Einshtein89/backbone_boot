package com.nixsolutions.backbone_boot.process;

import static org.apache.commons.lang3.StringUtils.EMPTY;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.nixsolutions.backbone_boot.entity.User;
import com.nixsolutions.backbone_boot.service.UserService;

@Service
public class AuthenticationProcess
{
  @Autowired
  private UserService userService;

  public Authentication getAuthentication()
  {
    return SecurityContextHolder.getContext().getAuthentication();
  }

  public User getAuthenticatedUser()
  {
    String userEmail = Optional.ofNullable(getAuthentication())
        .map(Principal::getName)
        .orElse(EMPTY);
    return Optional.ofNullable(userService.findByEmail(userEmail)).orElse(new User());
  }
}
