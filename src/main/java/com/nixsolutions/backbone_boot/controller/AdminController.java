package com.nixsolutions.backbone_boot.controller;

import static com.nixsolutions.backbone_boot.config.Constants.ADMIN_ROLE;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nixsolutions.backbone_boot.entity.Role;
import com.nixsolutions.backbone_boot.process.AuthenticationProcess;
import com.nixsolutions.backbone_boot.entity.User;
import com.nixsolutions.backbone_boot.service.UserService;

@Controller
public class AdminController
{
  @Autowired
  private UserService userService;
  @Autowired
  private AuthenticationProcess authenticationProcess;

  @GetMapping("/isAuthorised")
  public ResponseEntity getName()
  {
    User user = authenticationProcess.getAuthenticatedUser();
    boolean isAdmin = user.getRoles().stream().map(Role::getRole).anyMatch(ADMIN_ROLE::equals);

    return ResponseEntity.ok(isAdmin);
  }

  @PostMapping("/admin/deleteSelected")
  public String deleteSelected(@RequestParam("idList") List<Long> idList)
  {
    userService.deleteByCheckboxes(idList);
    return "redirect:/admin/#admin/listView";
  }
}
