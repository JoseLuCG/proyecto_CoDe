/* Base de datos del proyecto de code */
DROP DATABASE IF EXISTS wakeup;
CREATE DATABASE wakeup;
USE wakeup;

-- TABLE CREATION --
CREATE TABLE Users(
	id INTEGER AUTO_INCREMENT NOT NULL,
    nameUser VARCHAR(40) NOT NULL,
    lastNameUser VARCHAR(40) NOT NULL,
    passwd varchar(40) not null,
    phoneNumber VARCHAR(9) NOT NULL,
    unique(phoneNumber),
    CONSTRAINT id_user PRIMARY KEY (id)
);

CREATE TABLE CardioExercise(
	exerciseName VARCHAR(50) NOT NULL, 
    PRIMARY KEY (exerciseName)
);

CREATE TABLE StrengthExercise(
	exerciseName VARCHAR(50) NOT NULL,
	PRIMARY KEY (exerciseName)
);

CREATE TABLE User_Strength (
	exerciseDate DATE,
	idUSer INTEGER NOT NULL,
    setNumber INTEGER NOT NULL,
    exerciseName VARCHAR(50) NOT NULL,
    weight DOUBLE NOT NULL,
    repeats INTEGER NOT NULL,
    PRIMARY KEY (exerciseDate, idUser, setNumber, exerciseName),
    FOREIGN KEY (idUSer) REFERENCES Users (id) ON UPDATE CASCADE,
    FOREIGN KEY (exerciseName) REFERENCES StrengthExercise (exerciseName) ON UPDATE CASCADE,
    CHECK (weight >= 0),
    CHECK (repeats > 0),
    CHECK (setNumber > 0)
);

CREATE TABLE User_Cardio (
	exerciseDate DATE,
	idUSer INTEGER NOT NULL,
    exerciseName VARCHAR(50) NOT NULL,
    intensity DOUBLE,
    exerciseTime TIME,
    distance DOUBLE,
    PRIMARY KEY (exerciseDate, idUser, exerciseName),
    FOREIGN KEY (idUSer) REFERENCES Users (id) ON UPDATE CASCADE,
    FOREIGN KEY (exerciseName) REFERENCES CardioExercise (exerciseName) ON UPDATE CASCADE
);

