package com.nixsolutions.backbone_boot.controller;


import com.nixsolutions.backbone_boot.config.MessageReader;
import com.nixsolutions.backbone_boot.entity.User;
import com.nixsolutions.backbone_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

import static com.nixsolutions.backbone_boot.config.Constants.*;
import static com.nixsolutions.backbone_boot.config.Constants.LoginConstants.EMAIL;
import static com.nixsolutions.backbone_boot.config.Constants.LoginConstants.REGISTRATION;
import static com.nixsolutions.backbone_boot.config.Constants.LoginConstants.USER_NAME;

@Controller
public class LoginController {
	
	@Autowired
	private UserService userService;

	@Autowired
	MessageReader messageReader;

	@GetMapping(value = {"/", "/login"})
	public String login(HttpServletRequest request)
	{
//		ModelAndView modelAndView = new ModelAndView();
		if (request.isUserInRole(ADMIN_ROLE)) {
			return "redirect:/admin/";
//			modelAndView.setViewName("/admin/adminPage");
		}
		if (request.isUserInRole(USER_ROLE)) {
			return "redirect:/user";
//			modelAndView.setViewName("/user");
		}
//		else {
//			modelAndView.setViewName("login");
//		}

		return "login";
	}

	@GetMapping("/registration")
	public ModelAndView registration()
	{
		ModelAndView modelAndView = createDefaultModelAndView();
		User user = new User();
		modelAndView.addObject(USER, user);
		modelAndView.setViewName(REGISTRATION);
		return modelAndView;
	}

	@PostMapping("/registration")
	public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult)
	{
		ModelAndView modelAndView = createDefaultModelAndView();

		User userExists = userService.findByEmail(user.getEmail());
		if (userExists != null) {
			bindingResult
					.rejectValue(EMAIL, "error.user",
							messageReader.get("registration.duplicate.email"));
		}
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName(REGISTRATION);
		} else {
			userService.saveUser(user, true);
			modelAndView.addObject("successMessage", messageReader.get("registration.successful"));
			modelAndView.addObject(USER, new User());
			modelAndView.setViewName(REGISTRATION);
			
		}
		return modelAndView;
	}

	@GetMapping("/admin/")
	public ModelAndView home()
	{
		ModelAndView modelAndView = new ModelAndView();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.findByEmail(auth.getName());
		modelAndView.addObject(USER_NAME, "Welcome, " + user.getFirstName() + "!");
		modelAndView.setViewName("admin/adminPage");
		return modelAndView;
	}

	@GetMapping("/admin/getName")
	public ResponseEntity getName()
	{
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.findByEmail(auth.getName());
		return ResponseEntity.ok(user.getFirstName());
	}

	@PostMapping("/admin/deleteSelected")
	public String deleteSelected(@RequestParam("idList") List<Long> idList)
	{
		userService.deleteByCheckboxes(idList);
		return "redirect:/admin/#admin";
	}

	private ModelAndView createDefaultModelAndView()
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("genders", Arrays.asList("man", "women"));
		return modelAndView;
	}
}
