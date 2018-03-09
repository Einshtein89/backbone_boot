package com.nixsolutions.backbone_boot.controller;


import java.util.Arrays;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.nixsolutions.backbone_boot.entity.User;
import com.nixsolutions.backbone_boot.service.UserService;

@Controller
public class LoginController {
	
	@Autowired
	private UserService userService;

	@GetMapping(value = {"/", "/login"})
	public ModelAndView login(){
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("login");
		return modelAndView;
	}

	@GetMapping("/registration")
	public ModelAndView registration(){
		ModelAndView modelAndView = createDefaultModelAndView();
		User user = new User();
		modelAndView.addObject("user", user);
		modelAndView.setViewName("registration");
		return modelAndView;
	}

	@PostMapping("/registration")
	public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
		ModelAndView modelAndView = createDefaultModelAndView();

		User userExists = userService.findByEmail(user.getEmail());
		if (userExists != null) {
			bindingResult
					.rejectValue("email", "error.user",
							"There is already a user registered with the email provided");
		}
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("registration");
		} else {
			userService.saveUser(user);
			modelAndView.addObject("successMessage", "User has been registered successfully");
			modelAndView.addObject("user", new User());
			modelAndView.setViewName("registration");
			
		}
		return modelAndView;
	}

	@GetMapping("/admin/")
	public ModelAndView home(){
		ModelAndView modelAndView = new ModelAndView();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.findByEmail(auth.getName());
		modelAndView.addObject("userName", "Welcome, " + user.getFirstName() + "!");
		modelAndView.setViewName("admin/adminPage");
		return modelAndView;
	}

	private ModelAndView createDefaultModelAndView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("genders", Arrays.asList("man", "women"));
		return modelAndView;
	}
}
