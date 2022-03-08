CREATE TABLE `User` (
	`uid` varchar(255) NOT NULL,
	`reputation` int NOT NULL,
	`description` TEXT,
	`joiningDate` DATE NOT NULL,
	`displayName` TEXT NOT NULL,
	`photoURL` TEXT,
	`phoneNumber` varchar(20),
	`email` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`uid`)
);

CREATE TABLE `Question` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` varchar(255) NOT NULL,
	`title` TEXT NOT NULL,
	`content` TEXT NOT NULL,
	`score` int NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Answer` (
	`id` int NOT NULL AUTO_INCREMENT,
	`questionId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`content` TEXT NOT NULL,
	`score` int NOT NULL,
	`verifiy` BOOLEAN NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `QuestionVoter` (
	`id` int NOT NULL AUTO_INCREMENT,
	`questionId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`state` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `AnswerVoter` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` varchar(255) NOT NULL,
	`answerId` int NOT NULL,
	`state` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Tag` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `QuestionComment` (
	`id` int NOT NULL AUTO_INCREMENT,
	`questionId` int NOT NULL,
	`userId` TEXT NOT NULL,
	`content` TEXT NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `AnswerComment` (
	`id` int NOT NULL AUTO_INCREMENT,
	`answerId` int NOT NULL,
	`userId` TEXT NOT NULL,
	`content` TEXT NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `TagsOnQuestions` (
	`questionId` int NOT NULL,
	`tagId` int NOT NULL,
	PRIMARY KEY (`questionId`,`tagId`)
);

CREATE TABLE `TagsOnUsers` (
	`tagId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	PRIMARY KEY (`tagId`,`userId`)
);

CREATE TABLE `Document` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` TEXT NOT NULL,
	`url` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Question` ADD CONSTRAINT `Question_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `Answer` ADD CONSTRAINT `Answer_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`);

ALTER TABLE `Answer` ADD CONSTRAINT `Answer_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `QuestionVoter` ADD CONSTRAINT `QuestionVoter_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`);

ALTER TABLE `QuestionVoter` ADD CONSTRAINT `QuestionVoter_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `AnswerVoter` ADD CONSTRAINT `AnswerVoter_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `AnswerVoter` ADD CONSTRAINT `AnswerVoter_fk1` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`);

ALTER TABLE `QuestionComment` ADD CONSTRAINT `QuestionComment_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`);

ALTER TABLE `QuestionComment` ADD CONSTRAINT `QuestionComment_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `AnswerComment` ADD CONSTRAINT `AnswerComment_fk0` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`);

ALTER TABLE `AnswerComment` ADD CONSTRAINT `AnswerComment_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);

ALTER TABLE `TagsOnQuestions` ADD CONSTRAINT `TagsOnQuestions_fk0` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`);

ALTER TABLE `TagsOnQuestions` ADD CONSTRAINT `TagsOnQuestions_fk1` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`);

ALTER TABLE `TagsOnUsers` ADD CONSTRAINT `TagsOnUsers_fk0` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`);

ALTER TABLE `TagsOnUsers` ADD CONSTRAINT `TagsOnUsers_fk1` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`);