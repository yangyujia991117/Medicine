-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: Coin
-- ------------------------------------------------------
-- Server version	5.7.33-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;
drop database IF EXISTS `Medicine`;
create DATABASE Medicine;
USE Medicine;

--
-- Table structure for table `PatientAccount`
--
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
drop table IF EXISTS `PatientAccount`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create TABLE `PatientAccount`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT,
    `userName`    varchar(255) NOT NULL,
    `password`    varchar(255) NOT NULL,
    `phoneNumber` varchar(255) NOT NULL,
    `avatar`      varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `PatientAccount`
--
begin;
/*!40000 ALTER TABLE `PatientAccount` ENABLE KEYS */;
INSERT INTO PatientAccount VALUES (1, 'user0', '123456', '12345678901', 'http://yangyujia.oss-cn-beijing.aliyuncs.com/1674814043758.jpg?Expires=1990174039&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=FkrlkrKf0UGsnO10saQj1zVkXtw%3D');
/*!40000 ALTER TABLE `PatientAccount` ENABLE KEYS */;
COMMIT;

--
-- Table structure for table `IRResult`
--
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `IRResult`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create TABLE `IRResult`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT,
    `userId`      int(11) NOT NULL,
    `urlList`     text NOT NULL,
    `resultTextList`  text DEFAULT NULL,
    `resultImgList`   text DEFAULT NULL,
    `recognitionTime`         varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `IRResult`
--
begin;
/*!40000 ALTER TABLE `IRResult` ENABLE KEYS */;
INSERT INTO IRResult VALUES (1, 1, 'https://yangyujia.oss-cn-beijing.aliyuncs.com/1672831279408.jpg?Expires=1674812830&OSSAccessKeyId=TMP.3KhVvNtZQs8tckLGKFhkGgZ52kcQwYuabVz8JQhm8dWxaMenHQBZQSLg6a5eGQb7i6D1uqR6QpK97qXdBJhcGUti9CHabi&Signature=zt50Nodg4%2FUqgUQ6qh6TBjrlDEc%3D,https://yangyujia.oss-cn-beijing.aliyuncs.com/1672308682899.jpg?Expires=1674812903&OSSAccessKeyId=TMP.3KhVvNtZQs8tckLGKFhkGgZ52kcQwYuabVz8JQhm8dWxaMenHQBZQSLg6a5eGQb7i6D1uqR6QpK97qXdBJhcGUti9CHabi&Signature=pyXj%2F%2Ffo2XCYrTnG4Tsw4MxxooA%3D', '识别结果','https://yangyujia.oss-cn-beijing.aliyuncs.com/1672831279408.jpg?Expires=1674812830&OSSAccessKeyId=TMP.3KhVvNtZQs8tckLGKFhkGgZ52kcQwYuabVz8JQhm8dWxaMenHQBZQSLg6a5eGQb7i6D1uqR6QpK97qXdBJhcGUti9CHabi&Signature=zt50Nodg4%2FUqgUQ6qh6TBjrlDEc%3D,https://yangyujia.oss-cn-beijing.aliyuncs.com/1672308682899.jpg?Expires=1674812903&OSSAccessKeyId=TMP.3KhVvNtZQs8tckLGKFhkGgZ52kcQwYuabVz8JQhm8dWxaMenHQBZQSLg6a5eGQb7i6D1uqR6QpK97qXdBJhcGUti9CHabi&Signature=pyXj%2F%2Ffo2XCYrTnG4Tsw4MxxooA%3D', '2023/02/06 23:47:00');
/*!40000 ALTER TABLE `IRResult` ENABLE KEYS */;
COMMIT;