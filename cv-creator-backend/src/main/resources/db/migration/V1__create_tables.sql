CREATE DATABASE IF NOT EXISTS cvCreatorDatabase;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(35) DEFAULT '',
  `last_name` varchar(35) DEFAULT NULL,
  `birth_date` varchar(35) DEFAULT NULL,
  `birth_location` varchar(35) DEFAULT NULL,
  `street` varchar(35) DEFAULT NULL,
  `zip` varchar(35) DEFAULT NULL,
  `city` varchar(35) DEFAULT NULL,
  `country` varchar(35) DEFAULT NULL,
  `phone` varchar(35) DEFAULT NULL,
  `email` varchar(35) DEFAULT '',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(35) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_modified_by` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8;
CREATE TABLE `experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(10) NOT NULL,
  `position` int(11) NOT NULL,
  `header` varchar(150) NOT NULL DEFAULT '',
  `description` varchar(150) NOT NULL DEFAULT '',
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(100) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 59 DEFAULT CHARSET = utf8;
CREATE TABLE `hobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(10) NOT NULL,
  `position` int(11) NOT NULL,
  `name` varchar(150) NOT NULL DEFAULT '',
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(100) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 83 DEFAULT CHARSET = utf8;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `image_type_id` int(11) DEFAULT NULL,
  `name` varchar(70) NOT NULL DEFAULT '',
  `extension` varchar(4) NOT NULL DEFAULT '',
  `is_thumbnail` tinyint(1) NOT NULL,
  `created_by` varchar(100) DEFAULT 'CURRENT_TIMESTAMP',
  `created_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(100) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 49 DEFAULT CHARSET = utf8;
CREATE TABLE `image_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8;
CREATE TABLE `knowledge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(10) NOT NULL,
  `position` int(11) NOT NULL,
  `content` varchar(150) NOT NULL DEFAULT '',
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(100) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 464 DEFAULT CHARSET = utf8;
CREATE TABLE `progression` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(10) NOT NULL,
  `position` int(11) NOT NULL,
  `year` varchar(20) NOT NULL DEFAULT '',
  `header` varchar(150) NOT NULL DEFAULT '',
  `description` varchar(150) NOT NULL DEFAULT '',
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(100) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 295 DEFAULT CHARSET = utf8;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `enabled` tinyint(1) NOT NULL,
  `page_title` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `token_expired` tinyint(1) NOT NULL,
  `address_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`),
  KEY `address_box_id` (`address_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;
CREATE TABLE `users_experiences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `experience_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `progression_box_id` (`experience_id`),
  CONSTRAINT `users_experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `users_experiences_ibfk_2` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 59 DEFAULT CHARSET = utf8;
CREATE TABLE `users_hobbies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `hobby_id` (`hobby_id`),
  CONSTRAINT `users_hobbies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `users_hobbies_ibfk_2` FOREIGN KEY (`hobby_id`) REFERENCES `hobby` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 196 DEFAULT CHARSET = utf8;
CREATE TABLE `users_knowledges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `knowledge_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `progression_box_id` (`knowledge_id`),
  CONSTRAINT `users_knowledges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `users_knowledges_ibfk_2` FOREIGN KEY (`knowledge_id`) REFERENCES `knowledge` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2534 DEFAULT CHARSET = utf8;
CREATE TABLE `users_progressions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `progression_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `progression_box_id` (`progression_id`),
  CONSTRAINT `users_progressions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `users_progressions_ibfk_2` FOREIGN KEY (`progression_id`) REFERENCES `progression` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1245 DEFAULT CHARSET = utf8;
CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_roles_id_user` (`user_id`),
  KEY `user_roles_id_role` (`role_id`),
  CONSTRAINT `user_roles_id_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `users_roles_id_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8;