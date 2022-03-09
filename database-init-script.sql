--NOTE: The changes I made are just in my local database - hieuppham
DROP DATABASE IF EXISTS student_hub;
CREATE DATABASE student_hub;
use student_hub;
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
	`uid` varchar(255) NOT NULL,
	`reputation` int NOT NULL DEFAULT 0,
	`description` TEXT,
	`joiningDate` DATE NOT NULL DEFAULT (CURRENT_DATE),
	`displayName` VARCHAR(255) NOT NULL ,
	`photoURL` TEXT,
	`phoneNumber` varchar(20),
	`email` varchar(255) NOT NULL UNIQUE,
	FULLTEXT (`displayName`, `email`),
	PRIMARY KEY (`uid`)
);

DROP TABLE IF EXISTS `Question`;
CREATE TABLE `Question` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` varchar(255) NOT NULL,
	`title` VARCHAR(255) NOT NULL,
	`content` TEXT NOT NULL,
	`score` int NOT NULL DEFAULT 0,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FULLTEXT (`title`, `content`),
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `Answer`;
CREATE TABLE `Answer` (
	`id` int NOT NULL AUTO_INCREMENT,
	`questionId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`content` TEXT NOT NULL,
	`score` int NOT NULL DEFAULT 0,
	`verifiy` BOOLEAN NOT NULL DEFAULT FALSE,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `QuestionVoter`;
CREATE TABLE `QuestionVoter` (
	`id` int NOT NULL AUTO_INCREMENT,
	`questionId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`state` int NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `AnswerVoter`;
CREATE TABLE `AnswerVoter` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` varchar(255) NOT NULL,
	`answerId` int NOT NULL,
	`state` int NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `Tag`;
CREATE TABLE `Tag` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `QuestionComment`;
CREATE TABLE `QuestionComment` (
	`id` int NOT NULL AUTO_INCREMENT,
	`questionId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`content` TEXT NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `AnswerComment`;
CREATE TABLE `AnswerComment` (
	`id` int NOT NULL AUTO_INCREMENT,
	`answerId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`content` TEXT NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `TagsOnQuestions`;
CREATE TABLE `TagsOnQuestions` (
	`questionId` int NOT NULL,
	`tagId` int NOT NULL,
	PRIMARY KEY (`questionId`,`tagId`)
);
DROP TABLE IF EXISTS `TagsOnUsers`;
CREATE TABLE `TagsOnUsers` (
	`tagId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	PRIMARY KEY (`tagId`,`userId`)
);
DROP TABLE IF EXISTS `Document`;
CREATE TABLE `Document` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` TEXT NOT NULL,
	`url` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Question` ADD CONSTRAINT `Question_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `Answer` ADD CONSTRAINT `Answer_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`);

ALTER TABLE `Answer` ADD CONSTRAINT `Answer_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `QuestionVoter` DROP CONSTRAINT `QuestionVoter_fk0`;
ALTER TABLE `QuestionVoter` ADD CONSTRAINT `QuestionVoter_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE;

ALTER TABLE `QuestionVoter` ADD CONSTRAINT `QuestionVoter_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `AnswerVoter` ADD CONSTRAINT `AnswerVoter_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `AnswerVoter` ADD CONSTRAINT `AnswerVoter_fk1` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`);

ALTER TABLE `QuestionComment` DROP CONSTRAINT `QuestionComment_fk0`;
ALTER TABLE `QuestionComment` ADD CONSTRAINT `QuestionComment_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE;

ALTER TABLE `QuestionComment` ADD CONSTRAINT `QuestionComment_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `AnswerComment` ADD CONSTRAINT `AnswerComment_fk0` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`);

ALTER TABLE `AnswerComment` ADD CONSTRAINT `AnswerComment_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `TagsOnQuestions` ADD CONSTRAINT `TagsOnQuestions_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE;

ALTER TABLE `TagsOnQuestions` ADD CONSTRAINT `TagsOnQuestions_fk1` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`);

ALTER TABLE `TagsOnUsers` ADD CONSTRAINT `TagsOnUsers_fk0` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`);

ALTER TABLE `TagsOnUsers` ADD CONSTRAINT `TagsOnUsers_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

CREATE TRIGGER `update_qs_score_after_insert_qs_voter` AFTER INSERT ON `QuestionVoter`
FOR EACH ROW 
BEGIN
	UPDATE `Question` 
	SET `score` = (SELECT SUM(`state`) FROM `QuestionVoter` WHERE `questionId` = NEW.`questionId`) WHERE id = NEW.`questionId`;
END;

CREATE TRIGGER `update_qs_score_after_update_qs_voter` AFTER UPDATE ON `QuestionVoter`
FOR EACH ROW 
BEGIN
	UPDATE `Question` SET `score` = (
		SELECT SUM(`state`) FROM `QuestionVoter` WHERE `questionId` = NEW.`questionId`) WHERE id = NEW.`questionId`; 
END;
