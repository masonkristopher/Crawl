CREATE TABLE `User` (
  `Id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(50) NOT NULL,
  `Name_First` VARCHAR(80),
  `Name_Last` VARCHAR(80),
  `Phone_Number` INT(20),
  `Email` VARCHAR(50)
);
CREATE TABLE `Crawl` (
  `Id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Id_Creater` VARCHAR(80),
  `Title` VARCHAR(80),
  `Crawl_Date` datetime(30),
  `Id_Current_Crawl` INT,
  `Id_Next_Crawl` INT
);
CREATE TABLE `User_Crawl` (
  `Id` INT,
  `Id_Profile` INT,
  `Id_Crawl` INT
);
CREATE TABLE `Location` (
  `Id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(80),
  `State` VARCHAR(80),
  `City` VARCHAR(80),
  `Zip` INT,
  `Lat` INT,
  `Lon` INT
);
CREATE TABLE `Location_Crawl` (
  `Id` INT,
  `Id_Location` INT,
  `Id_Crawl` INT,
  `Order_Postition` INT
);
ALTER TABLE `User_Crawl` ADD FOREIGN KEY (`Id_Profile`) REFERENCES `User` (`Id`);
ALTER TABLE `Crawl` ADD FOREIGN KEY (`Id`) REFERENCES `User_Crawl` (`Id_Crawl`);
ALTER TABLE `Crawl` ADD FOREIGN KEY (`Id_Creater`) REFERENCES `User` (`Id`);
ALTER TABLE `Location_Crawl` ADD FOREIGN KEY (`Id_Location`) REFERENCES `Location` (`Id`);
ALTER TABLE `Crawl` ADD FOREIGN KEY (`Id`) REFERENCES `Location_Crawl` (`Id_Crawl`);