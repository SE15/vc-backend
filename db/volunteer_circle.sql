CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(32) NOT NULL,
  `profile_pic` varchar(150),
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
  `state` enum('pending','accepted','rejected'),
  PRIMARY KEY (`requester_id`, `recipient_id`),
  CONSTRAINT FK_RequesterUser FOREIGN KEY (requester_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_RecipientUser FOREIGN KEY (recipient_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `location` varchar(150),
  `start_date` timestamp,
  `end_date` timestamp,
  `state` enum('created','occurred','deleted','closed'),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Skill` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `verifications` int unsigned,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_UserSkill FOREIGN KEY (user_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Validation` (
  `skill_id` int NOT NULL,
  `validated_by` int NOT NULL,
  PRIMARY KEY (`skill_id`, `validated_by`),
  CONSTRAINT FK_SkillValidation FOREIGN KEY (skill_id) 
  REFERENCES Skill(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_SkilLvalidatedBy FOREIGN KEY (validated_by) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Membership` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `role_id` int,
  `designation` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE(`user_id`,`event_id`),
  CONSTRAINT FK_MembershipUser FOREIGN KEY (user_id) 
  REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_MembershipEvent FOREIGN KEY (event_id) 
  REFERENCES Event(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_MembershipRole FOREIGN KEY (role_id) 
  REFERENCES Event(id) ON DELETE SET NULL ON UPDATE CASCADE
);