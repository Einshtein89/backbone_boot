package com.nixsolutions.backbone_boot.controller;


import static com.nixsolutions.backbone_boot.config.Constants.ADMIN_ROLE;
import static com.nixsolutions.backbone_boot.config.Constants.LoginConstants.*;
import static com.nixsolutions.backbone_boot.config.Constants.SecurityConstants.LOGOUT;
import static com.nixsolutions.backbone_boot.config.Constants.USER;
import static com.nixsolutions.backbone_boot.config.Constants.USER_ROLE;
import static java.lang.String.format;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.nixsolutions.backbone_boot.process.AuthenticationProcess;
import com.nixsolutions.backbone_boot.config.MessageReader;
import com.nixsolutions.backbone_boot.entity.User;
import com.nixsolutions.backbone_boot.service.UserService;

@Controller
public class LoginController {
	
	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationProcess authenticationProcess;

	@Autowired
	MessageReader messageReader;

	@GetMapping(value = {"/"})
	public String index(HttpServletRequest request)
	{
		return redirectTo(request, INDEX);
	}

	@GetMapping(value = {"/login"})
	public String login(HttpServletRequest request, String page)
	{
		return redirectTo(request, LOGIN);
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

	@GetMapping("/admin")
	public ModelAndView adminHome()
	{
		ModelAndView adminHomeModelAndView = populateHomeModelAndView();
		adminHomeModelAndView.addObject("admin", true);
		adminHomeModelAndView.setViewName("admin/adminPage");
		return adminHomeModelAndView;
	}

	@GetMapping("/user")
	public ModelAndView userHome()
	{
		ModelAndView userHomeModelAndView = populateHomeModelAndView();
		userHomeModelAndView.setViewName("user/userPage");
		return userHomeModelAndView;
	}

	@GetMapping("/403")
	public String error()
	{
		return "error/403";
	}

	private ModelAndView createDefaultModelAndView()
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("genders", Arrays.asList("man", "women"));
		return modelAndView;
	}

	private ModelAndView populateHomeModelAndView()
	{
		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject(USER_NAME, MessageFormat
				.format(messageReader.get("authorised.greeting"), authenticationProcess.getAuthenticatedUser().getFirstName()));

		return modelAndView;
	}

	private String redirectTo(HttpServletRequest request, String page)
	{
		if (Objects.nonNull(authenticationProcess.getAuthentication()) && request.isUserInRole(ADMIN_ROLE)) {
			return "redirect:/admin";
		}
		if (Objects.nonNull(authenticationProcess.getAuthentication()) && request.isUserInRole(USER_ROLE)) {
			return "redirect:/user";
		}

		return page;
	}


}
