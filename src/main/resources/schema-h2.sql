DROP TABLE IF EXISTS USER;

CREATE TABLE USER (
--   ID BIGINT IDENTITY NOT NULL PRIMARY KEY,
--   FIRST_NAME VARCHAR(64) NOT NULL,
--   LAST_NAME VARCHAR(64) NOT NULL,
--   PHONE VARCHAR(64) NOT NULL,
--   SEX VARCHAR(64) NOT NULL
-- );
-- CREATE TABLE `user` (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  sex VARCHAR(64) NOT NULL,
  active int(11) DEFAULT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
--   KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`)
--   CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
--   CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
