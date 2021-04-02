CREATE TABLE `app_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

CREATE TABLE `app_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `app_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_profile_path` varchar(255) DEFAULT NULL,
  `user_profile` longblob,
  `user_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO app_role (`id`, `description`, `role_name`) VALUES ('1', 'Standard User - Has no admin rights', 'STANDARD_USER');
INSERT INTO app_role (`id`, `description`, `role_name`) VALUES ('2', 'Admin User - Has permission to perform admin tasks', 'ADMIN_USER');

INSERT INTO `app_user` VALUES (1,'Admin','Admin','$2a$10$sap2uktmHhe1baACj2JkkOJt5TgfUY89.mf9.0AWaaHkhhGCc8Fsi','admin@system.com',NULL,NULL,1);
INSERT INTO `user_role` VALUES (1,1,2);

CREATE TABLE `app_owner` (
  `idapp_owner` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `company` tinyint(4) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `primary_email` varchar(45) NOT NULL,
  `alternate_email` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `home_number` varchar(45) DEFAULT NULL,
  `office_number` varchar(45) DEFAULT NULL,
  `number` varchar(45) DEFAULT NULL,
  `street_address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `taxpayer_id` varchar(45) DEFAULT NULL,
  `taxpayer_type` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idapp_owner`)
) ENGINE=InnoDB;

CREATE TABLE `property` (
  `id_property` int(11) NOT NULL AUTO_INCREMENT,
  `property_name` varchar(45) DEFAULT NULL,
  `property_type` varchar(45) DEFAULT NULL,
  `property_description` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `zip_code` varchar(45) DEFAULT NULL,
  `unitcount` int(11) DEFAULT NULL,
  `hallcount` int(11) DEFAULT NULL,
  `bedcount` int(11) DEFAULT NULL,
  `gallerycount` int(11) DEFAULT NULL,
  `kitchencount` int(11) DEFAULT NULL,
  `bathroomcount` int(11) DEFAULT NULL,
  `toiletcount` int(11) DEFAULT NULL,
  `entrygatenum` int(11) DEFAULT NULL,
  `otherInfo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_property`)
) ENGINE=InnoDB AUTO_INCREMENT=2;