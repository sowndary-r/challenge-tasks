CREATE DATABASE IF NOT EXISTS challenge;

USE challenge;

DROP TABLE IF EXISTS userInfo;
DROP TABLE IF EXISTS videos;

CREATE TABLE userInfo(
   id    INTEGER NOT NULL AUTO_INCREMENT ,
   userName varchar(255)
);

CREATE TABLE videos(
   id    INTEGER NOT NULL AUTO_INCREMENT ,
   userId  INTEGER,
   video  varchar(255),
   uploadedDate DATE
);
