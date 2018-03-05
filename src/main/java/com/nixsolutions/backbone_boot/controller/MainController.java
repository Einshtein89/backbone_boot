//package com.nixsolutions.backbone_boot.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//
//import javax.servlet.http.HttpServletRequest;
//
////@Controller
//public class MainController {
//
////    @GetMapping("/")
////    public String home1() {
////        return "/index";
////    }
////
////    @GetMapping("/index")
////    public String home() {
////        return "/index";
////    }
//
//    @GetMapping("/admin")
//    public String admin() {
//        return "/adminPage.html";
//    }
//
//    @GetMapping("/user")
//    public String user() {
//        return "/user";
//    }
//
//    @GetMapping("/about")
//    public String about() {
//        return "/about";
//    }
//
//    @GetMapping("/login")
//    public String login() {
//        return "/loginPage.html";
//    }
//
////    @PostMapping("/login1")
//    public String login1() {
//        return null;
//    }
//
//    @PostMapping("/login")
////    @RequestMapping(value = {"/login1"}, method = RequestMethod.GET)
//    public String loginPage(HttpServletRequest request) {
//        if (request.isUserInRole("admin")) {
////            logger.info("redirecting to admin page");
//            return "redirect:/adminPage.html";
//        }
//        if (request.isUserInRole("user")) {
////            logger.info("redirecting to user page");
//            return "redirect:/user.html";
//        }
//        return "/loginPage.html";
//    }
//
//    @GetMapping("/403")
//    public String error403() {
//        return "/error/403";
//    }
//}
