CREATE DATABASE IF NOT EXISTS `task_manager` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `task_manager`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(1) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(65) NOT NULL,
    `email` VARCHAR(65) NOT NULL,
    `password` VARCHAR(65) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `task` (
    `id` INT(1) NOT NULL AUTO_INCREMENT,
    `user_id` INT(1) NOT NULL,
    `name` VARCHAR(65) NOT NULL,
    `description` VARCHAR(255) NULL,
    `category` VARCHAR(120) NULL,
    `date` VARCHAR(10) NOT NULL,
    `time` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `reminder` (
    `id` INT(1) NOT NULL AUTO_INCREMENT,
    `user_id` INT(1) NOT NULL,
    `name` VARCHAR(65) NOT NULL,
    `description` VARCHAR(255) NULL,
    `date` VARCHAR(10) NOT NULL,
    `time` VARCHAR(5) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
