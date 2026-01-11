/* Base de datos del proyecto de code */
DROP DATABASE IF EXISTS wakeup;
CREATE DATABASE wakeup;
USE wakeup;

-- TABLE CREATION --
CREATE TABLE Users(
	uuid_user CHAR(36) NOT NULL,
    name_user VARCHAR(40) NOT NULL,
    last_name_user VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(9) NOT NULL,
    user_password varchar(40) not null,
    unique(phone_number),
    CONSTRAINT uuid_user PRIMARY KEY (uuid_user)
);

CREATE TABLE strength_exercise (
	uuid_strength_exercise CHAR(36) NOT NULL,
	exercise_date DATE,
	uuid_user CHAR(36) NOT NULL,
    set_number INTEGER NOT NULL,
    exercise_name VARCHAR(50) NOT NULL,
    weight DOUBLE NOT NULL,
    repeats INTEGER NOT NULL,
    PRIMARY KEY (exercise_date, uuid_user, set_number, exercise_name),
    FOREIGN KEY (uuid_user) REFERENCES Users (uuid_user) ON UPDATE CASCADE,
    CHECK (weight >= 0),
    CHECK (repeats > 0),
    CHECK (set_number > 0)
);

CREATE TABLE cardio_exercise (
	uuid_cardio_exercise CHAR(36) NOT NULL,
	exercise_date DATE NOT NULL,
	uuid_user CHAR(36) NOT NULL,
    exercise_name VARCHAR(50) NOT NULL,
    intensity DOUBLE,
    exercise_time TIME,
    distance DOUBLE,
    PRIMARY KEY (exercise_date, uuid_user, exercise_name),
    FOREIGN KEY (uuid_user) REFERENCES Users (uuid_user) ON UPDATE CASCADE
);

-- Tables updates --
/* Cardio table */
ALTER TABLE cardio_exercise
DROP PRIMARY KEY;
ALTER TABLE cardio_exercise
ADD PRIMARY KEY (uuid_cardio_exercise);

/* Users Table */
ALTER TABLE users
ADD COLUMN age INTEGER;
ALTER TABLE users
ADD COLUMN weight FLOAT;
ALTER TABLE users
ADD COLUMN height FLOAT;