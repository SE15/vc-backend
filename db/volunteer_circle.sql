DROP DATABASE IF EXISTS volunteer_circle;
CREATE DATABASE volunteer_circle;
USE volunteer_circle;


CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` char(32) NOT NULL,
  `profile_pic` varchar(150) DEFAULT '',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Recommendation` (
  `user_id` int NOT NULL,
  `recommended_by` int NOT NULL,
  `description` varchar(400),
  PRIMARY KEY (`user_id`, `recommended_by`),
  CONSTRAINT FK_OwnerUser FOREIGN KEY (user_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_RecommendedUser FOREIGN KEY (recommended_by) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Connection` (
  `requester_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `state` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`requester_id`, `recipient_id`,`state`),
  CONSTRAINT FK_RequesterUser FOREIGN KEY (requester_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_RecipientUser FOREIGN KEY (recipient_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `validations` int unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT UC_UserSkill UNIQUE(`user_id`, `name`),
  CONSTRAINT FK_UserSkill FOREIGN KEY (user_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Validation` (
  `skill_id` int NOT NULL,
  `validated_by` int NOT NULL,
  PRIMARY KEY (`skill_id`, `validated_by`),
  CONSTRAINT FK_SkillValidation FOREIGN KEY (skill_id) 
  REFERENCES Skill(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_SkilLValidatedBy FOREIGN KEY (validated_by) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER $$

CREATE TRIGGER `TR_OwnerCannotValidateOwnSkill`
  BEFORE INSERT ON `Validation`
  FOR EACH ROW
  BEGIN
    IF (NEW.`validated_by` = (SELECT `user_id` FROM `skill` WHERE `id` = NEW.`skill_id`))
    THEN
      SIGNAL SQLSTATE '02000'  
      SET MESSAGE_TEXT = 'Warning: owner cannot validate his own skill';
    END IF;
  END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER `TR_OwnerCannotRecommendHimself`
  BEFORE INSERT ON `Recommendation`
  FOR EACH ROW
  BEGIN
    IF (NEW.`recommended_by` = NEW.`user_id`)
    THEN
      SIGNAL SQLSTATE '02000'  
      SET MESSAGE_TEXT = 'Warning: owner cannot recommend himself';
    END IF;
  END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER `TR_OwnerCannotSendConnectionToHimself`
  BEFORE INSERT ON `Connection`
  FOR EACH ROW
  BEGIN
    IF (NEW.`requester_id` = NEW.`recipient_id`)
    THEN
      SIGNAL SQLSTATE '02000'  
      SET MESSAGE_TEXT = 'Warning: owner cannot send a connection to himself';
    END IF;
  END$$
DELIMITER ;