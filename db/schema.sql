CREATE DATABASE creator_db;

USE creator_db;

CREATE TABLE worlds (
    id INT NOT NULL AUTO_INCREMENT,
    world_name VARCHAR(45) NOT NULL,
    world_type VARCHAR(45) NOT NULL,
    classification VARCHAR(45) NOT NULL,
    life BOOLEAN NOT NULL,
    intelligent_life BOOLEAN NOT NULL,
    image_slug VARCHAR(45) NOT NULL,
    destroyed BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);