package com.nixsolutions.backbone_boot.config;

public class Constants {
    public static final String ADMIN_ROLE = "ADMIN";
    public static final String USER_ROLE = "USER";
    public static final String USER = "user";


    public class LoginConstants {
        public LoginConstants(){

        }
        public static final String REGISTRATION = "registration";
        public static final String EMAIL = "email";
        public static final String USER_NAME = "userName";
        public static final String PASSWORD = "password";
    }

    public class SecurityConstants {
        public SecurityConstants(){

        }
        public static final String SLASH = "/";
        public static final String LOGIN = "/login";
        public static final String LOGOUT = "/logout";
        public static final String ADMIN_PAGES = "/admin/**";
        public static final String ACCESS_DENIED = "/access-denied";

    }
}
