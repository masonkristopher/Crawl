/**
 * Execute this file from the command line by typing:
 *   mysql -u root < schema.sql
 */

DROP DATABASE IF EXISTS crawl;
CREATE DATABASE crawl;
USE crawl;

CREATE TABLE `User` (
  `Id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(50) NOT NULL,
  `Name_First` VARCHAR(80),
  `Name_Last` VARCHAR(80),
  `Phone_Number` VARCHAR(12),
  `Email` VARCHAR(50) NOT NULL UNIQUE,
  `Image_Url` VARCHAR(160),
  `Lat`  DECIMAL(10, 8),
  `Lng` DECIMAL(10,8)
);

CREATE TABLE `Crawl` (
  `Id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Id_Creator` INT,
  `Title` VARCHAR(80),
  `Crawl_Date` DATE,
  `Crawl_Time` TIME
);

CREATE TABLE `User_Crawl` (
  `Id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Id_User` INT,
  `Id_Crawl` INT
);

CREATE TABLE `Location` (
  `Id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Address` VARCHAR (120) UNIQUE,
  `Lat`  DECIMAL(10, 8),
  `Lng` DECIMAL(10,8),
  `Name` VARCHAR(80)
  -- `Number_Street`  VARCHAR (12),
  -- `Street` VARCHAR(80),
  -- `City` VARCHAR(80),
  -- `State` VARCHAR(80),
  -- `Zip` INT,
);


CREATE TABLE `Location_Crawl` (
  `Id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Id_Location` INT,
  `Id_Crawl` INT,
  `Order_Postition` INT
);

ALTER TABLE `User_Crawl` ADD FOREIGN KEY (`Id_User`) REFERENCES `User` (`Id`);
ALTER TABLE `User_Crawl` ADD FOREIGN KEY (`Id_Crawl`) REFERENCES `Crawl` (`Id`);
ALTER TABLE `Location_Crawl` ADD FOREIGN KEY (`Id_Location`) REFERENCES `Location` (`Id`);
ALTER TABLE `Location_Crawl` ADD FOREIGN KEY (`Id_Crawl`) REFERENCES `Crawl` (`Id`);
ALTER TABLE `Crawl` ADD FOREIGN KEY (`Id_Creator`) REFERENCES `User` (`Id`);
