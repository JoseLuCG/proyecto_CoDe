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
DROP TABLE IF EXISTS strength_exercise;
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
-- New Tables
CREATE TABLE strength_exercise (
    uuid_strength_exercise CHAR(36) NOT NULL,
    exercise_date DATE NOT NULL,
    uuid_user CHAR(36) NOT NULL,
    exercise_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (uuid_strength_exercise),
    FOREIGN KEY (uuid_user)
        REFERENCES Users (uuid_user)
        ON UPDATE CASCADE,
    UNIQUE (exercise_date, uuid_user, exercise_name)
);

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
-- Data Migration
INSERT INTO strength_exercise ( uuid_strength_exercise, exercise_date, uuid_user, exercise_name)
SELECT UUID(), exercise_date, uuid_user, exercise_name
FROM (
    SELECT DISTINCT
        exercise_date,
        uuid_user,
        exercise_name
    FROM strength_exercise_old
) t;

INSERT INTO exercise_set (uuid_exercise_set, uuid_strength_exercise, set_number, weight, repeats)
SELECT
    UUID(), se.uuid_strength_exercise, old.set_number, old.weight, old.repeats
	FROM strength_exercise_old old
		JOIN strength_exercise se
			ON se.exercise_date = old.exercise_date
			AND se.uuid_user = old.uuid_user
			AND se.exercise_name = old.exercise_name
;

-- Tables updates --
/* Cardio table */
ALTER TABLE cardio_exercise
DROP PRIMARY KEY;
ALTER TABLE cardio_exercise
ADD PRIMARY KEY (uuid_cardio_exercise);

/* Strength table */
ALTER TABLE strength_exercise
DROP PRIMARY KEY;
ALTER TABLE strength_exercise
ADD PRIMARY KEY (uuid_strength_exercise);
ALTER TABLE strength_exercise
RENAME TO strength_exercise_old;

/* Users Table */
ALTER TABLE users
ADD COLUMN age INTEGER;
ALTER TABLE users
ADD COLUMN weight FLOAT;
ALTER TABLE users
ADD COLUMN height FLOAT;

SELECT
    se.exercise_name,
    COUNT(es.uuid_exercise_set) AS total_sets
FROM strength_exercise se
JOIN exercise_set es
  ON se.uuid_strength_exercise = es.uuid_strength_exercise
GROUP BY se.uuid_strength_exercise;