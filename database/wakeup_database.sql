/* WAKEUP DATABASE IN MARIADB */
DROP DATABASE IF EXISTS wakeup;
CREATE DATABASE wakeup;
USE wakeup;

-- TABLE CREATION --

/* ----- USERS TABLE ----- */
CREATE TABLE user(
	uuid_user CHAR(36) NOT NULL,
    name_user VARCHAR(40) NOT NULL,
    last_name_user VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(9) NOT NULL,
    user_password varchar(40) NOT NULL,
    age INTEGER NOT NULL DEFAULT 0,
    weight DECIMAL(5,2) NOT NULL DEFAULT (0.00),
    height SMALLINT UNSIGNED NOT NULL DEFAULT (100),
    UNIQUE (phone_number),
    PRIMARY KEY (uuid_user),
    CHECK (height BETWEEN 50 AND 250)
);

/* ----- STRENGTH TABLE ----- */
CREATE TABLE strength_exercise (
    uuid_strength_exercise CHAR(36) NOT NULL,
    exercise_date DATE NOT NULL,
    uuid_user CHAR(36) NOT NULL,
    exercise_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (uuid_strength_exercise),
    FOREIGN KEY (uuid_user)
        REFERENCES user (uuid_user)
        ON UPDATE CASCADE,
    UNIQUE (exercise_date, uuid_user, exercise_name)
);

/* ----- SET TABLE ----- */
CREATE TABLE exercise_set (
    uuid_exercise_set CHAR(36) NOT NULL,
    uuid_strength_exercise CHAR(36) NOT NULL,
    set_number INTEGER NOT NULL,
    weight DOUBLE NOT NULL,
    repeats INTEGER NOT NULL,
    PRIMARY KEY (uuid_exercise_set),
    FOREIGN KEY (uuid_strength_exercise)
        REFERENCES strength_exercise (uuid_strength_exercise)
        ON DELETE CASCADE,
    CHECK (weight >= 0),
    CHECK (repeats > 0),
    CHECK (set_number > 0),
    UNIQUE (uuid_strength_exercise, set_number)
);

/* ----- CARDIO TABLE ----- */
CREATE TABLE cardio_exercise (
	uuid_cardio_exercise CHAR(36) NOT NULL,
	exercise_date DATE NOT NULL,
	uuid_user CHAR(36) NOT NULL,
    exercise_name VARCHAR(50) NOT NULL,
    intensity DOUBLE,
    exercise_time TIME,
    distance DOUBLE,
    PRIMARY KEY (uuid_cardio_exercise),
    FOREIGN KEY (uuid_user) REFERENCES user (uuid_user) ON UPDATE CASCADE,
    UNIQUE (exercise_date, uuid_user, exercise_name)
);

-- USEFULL REFERENCE --
SELECT
    se.exercise_name,
    COUNT(es.uuid_exercise_set) AS total_sets
FROM strength_exercise se
JOIN exercise_set es
  ON se.uuid_strength_exercise = es.uuid_strength_exercise
GROUP BY se.uuid_strength_exercise;