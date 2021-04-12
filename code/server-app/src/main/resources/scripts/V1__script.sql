
DROP TABLE IF EXISTS `app_contact`;
CREATE TABLE `app_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  ;


DROP TABLE IF EXISTS `app_owner`;
CREATE TABLE `app_owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `primary_email` varchar(45) NOT NULL,
  `alternate_email` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `home_number` varchar(45) DEFAULT NULL,
  `office_number` varchar(45) DEFAULT NULL,
  `street_address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `taxpayer_id` varchar(45) DEFAULT NULL,
  `taxpayer_type` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31  ;

LOCK TABLES `app_owner` WRITE;
INSERT INTO `app_owner` VALUES (30,36,'ABC','amol23@gmail.com',NULL,'+9187676565467',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `app_role`;
CREATE TABLE `app_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8  ;

LOCK TABLES `app_role` WRITE;
INSERT INTO `app_role` VALUES (1,'Admin User - Has permission to perform admin tasks','ADMIN_USER'),(2,'Standard User - Has no admin rights','STANDARD_USER'),(3,'Inspector','INSPECTOR'),(4,'Local guide','LOCAL_GUIDE'),(5,'Vendor - service Provider','VENDOR'),(6,'Owner','OWNER'),(7,'Tenent ','TENANT');
UNLOCK TABLES;

DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_profile_path` varchar(255) DEFAULT NULL,
  `user_profile` longblob DEFAULT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38  ;


LOCK TABLES `app_user` WRITE;
INSERT INTO `app_user` VALUES (1,'Admin','Admin','$2a$10$sap2uktmHhe1baACj2JkkOJt5TgfUY89.mf9.0AWaaHkhhGCc8Fsi','admin@system.com',NULL,NULL,1),(36,'Amol','Marathe4','$2a$10$rOC8v5Ms1NbtIPeD3Iw6n.IdJNZl7pw8RdQYIn2svSSnE4G1XVl7q','amol23@gmail.com',NULL,NULL,1),(37,'Pravin','Abhale','$2a$10$x8xu2eWxemBXVHgztZ4RiOZfV2LFSwxowubDgl2.snPwLzyx4ijCS','amo321@gmail.com',NULL,NULL,1);
UNLOCK TABLES;


DROP TABLE IF EXISTS `flyway_schema_history`;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int(11) NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int(11) DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `execution_time` int(11) NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB  ;


DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_name` varchar(1000) DEFAULT NULL,
  `property_type_id` int(11) DEFAULT NULL,
  `lat` decimal(6,4) DEFAULT NULL,
  `lng` decimal(6,4) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','PENDING','UNDERCONSTRUCTION') DEFAULT NULL,
  `property_description` varchar(1000) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL,
  `property_code` varchar(100) NOT NULL,
  PRIMARY KEY (`property_id`,`property_code`)
) ENGINE=InnoDB  ;

DROP TABLE IF EXISTS `property_photos`;
CREATE TABLE `property_photos` (
  `property_photo_id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `property_unit_id` int(11) DEFAULT NULL,
  `photo` blob DEFAULT NULL,
  `photoLink` varchar(1000) DEFAULT NULL,
  `altText` varchar(255) DEFAULT NULL,
  `parking` decimal(4,2) DEFAULT NULL,
  `parking_area` decimal(4,2) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`property_photo_id`)
) ENGINE=InnoDB  ;


DROP TABLE IF EXISTS `property_type`;
CREATE TABLE `property_type` (
  `type_id` int(11) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB  ;

LOCK TABLES `property_type` WRITE;
INSERT INTO `property_type` VALUES (1,'Residential','Residency'),(2,'Commercial','Commential'),(3,'Plot',NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `property_unit`;
CREATE TABLE `property_unit` (
  `property_unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `bed` int(11) DEFAULT NULL,
  `gallary` int(11) DEFAULT NULL,
  `bath` int(11) DEFAULT NULL,
  `squareFeet` decimal(10,2) DEFAULT NULL,
  `carpet` decimal(10,2) DEFAULT NULL,
  `sellable` decimal(10,2) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`property_unit_id`),
  KEY `type_id_idx` (`type_id`),
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `property_type` (`type_id`)
) ENGINE=InnoDB  ;

DROP TABLE IF EXISTS `propertyownermapping`;
CREATE TABLE `propertyownermapping` (
  `mappingId` int(11) NOT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `propertyId` int(11) DEFAULT NULL,
  `registerDate` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `updatedOn` int(11) DEFAULT NULL,
  PRIMARY KEY (`mappingId`),
  KEY `OWNER_PROPERTY_MAPPING_OWNER_ID_idx` (`ownerId`),
  CONSTRAINT `OWNER_PROPERTY_MAPPING_OWNER_ID` FOREIGN KEY (`ownerId`) REFERENCES `app_owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB  ;

DROP TABLE IF EXISTS `rent`;
CREATE TABLE `rent` (
  `property_id` int(11) NOT NULL,
  `property_unit_id` int(11) DEFAULT NULL,
  `min_rent` decimal(10,2) DEFAULT NULL,
  `max_rent` decimal(10,2) DEFAULT NULL,
  `security_deposite` decimal(10,2) DEFAULT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedOn` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB  ;

DROP TABLE IF EXISTS `tenant`;
CREATE TABLE `tenant` (
  `tenant_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `tax_payer_id` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `relationship` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`tenant_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `FK_TANENT_USER_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2  ;

LOCK TABLES `tenant` WRITE;
INSERT INTO `tenant` VALUES (1,37,NULL,NULL,NULL,NULL,'+918888888888');
UNLOCK TABLES;

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3  ;

LOCK TABLES `user_role` WRITE;
INSERT INTO `user_role` VALUES (1,36,6),(2,37,7);
UNLOCK TABLES;


ALTER TABLE `property_photos` 
DROP COLUMN `parking_area`,
DROP COLUMN `parking`,
CHANGE COLUMN `property_photo_id` `property_photo_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `property_id` `property_id` INT(11) NOT NULL ,
CHANGE COLUMN `property_unit_id` `property_unit_id` INT(11) NOT NULL ,
CHANGE COLUMN `altText` `photo_category` VARCHAR(255) NULL DEFAULT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`property_photo_id`, `property_id`, `property_unit_id`);

ALTER TABLE `property_photos` 
CHANGE COLUMN `photoLink` `photo_link` VARCHAR(1000) NULL DEFAULT NULL ,
ADD COLUMN `photo_type` VARCHAR(45) NULL AFTER `photo`;

ALTER TABLE `property_photos` 
CHANGE COLUMN `photo` `photo` LONGBLOB NULL DEFAULT NULL ;

CREATE TABLE `property_rate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `property_id` INT NOT NULL,
  `amount` DOUBLE NULL,
  `updatedBy` INT NULL,
  `updatedOn` DATETIME NULL,
  PRIMARY KEY (`id`, `property_id`));
  
 CREATE TABLE `property_occupancy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `property_id` INT NOT NULL,
  `owner_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  PRIMARY KEY (`id`, `property_id`, `owner_id`, `tenant_id`));
 
 ALTER TABLE `property` 
CHANGE COLUMN `status` `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING', 'UNDERCONSTRUCTION', 'INSPECTION', 'REJECTED') NULL DEFAULT NULL ;

ALTER TABLE `propertyownermapping` 
CHANGE COLUMN `mappingId` `mappingId` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `ownerId` `ownerId` INT(11) NOT NULL ,
CHANGE COLUMN `propertyId` `propertyId` INT(11) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`mappingId`, `ownerId`, `propertyId`);

ALTER TABLE `propertyownermapping` 
CHANGE COLUMN `registerDate` `registerDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE `app_owner` 
CHANGE COLUMN `street_address` `street_address` VARCHAR(500) NULL DEFAULT NULL ;

CREATE TABLE `property_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `property_id` INT NULL,
  `user_id` INT NULL,
  `status` VARCHAR(45) NULL,
  `remark` VARCHAR(500) NULL,
  `updated_date` DATETIME NULL,
  PRIMARY KEY (`id`));




 
 


