/* Base de datos del proyecto de code */
DROP DATABASE IF EXISTS wakeup;
CREATE DATABASE wakeup;
USE wakeup;

-- TABLE CREATION --
CREATE TABLE Users(
	id INTEGER AUTO_INCREMENT NOT NULL,
    nameUser VARCHAR(40) NOT NULL,
    lastNameUser VARCHAR(40) NOT NULL, 
    phoneNumber VARCHAR(9) NOT NULL,
    CONSTRAINT id_user PRIMARY KEY (id)
);

CREATE TABLE CardioExercise(
	exerciseName VARCHAR(50) NOT NULL, 
    intensity DOUBLE,
    exerciseTime TIME NOT NULL, 
    distance DOUBLE,
    CONSTRAINT cardioExerciseName PRIMARY KEY (exerciseName),
    CHECK (exerciseTime > 0), 
    CHECK (distance > 0), 
    CHECK (intensity > 0)
);

CREATE TABLE StrengthExercise(
	exerciseName VARCHAR(50) NOT NULL,
    CONSTRAINT strengthExerciseName PRIMARY KEY (exerciseName)
);

CREATE TABLE ExerciseSet (
	exerciseName VARCHAR(50) NOT NULL,
    setNumber INTEGER NOT NULL,
    weight DOUBLE NOT NULL,
    repeats INTEGER NOT NULL,
    PRIMARY KEY (exerciseName, setNumber),
	FOREIGN KEY (exerciseName) REFERENCES StrengthExercise (exerciseName) ON UPDATE CASCADE,
    CHECK (weight >= 0),
    CHECK (repeats > 0),
    CHECK (setNumber > 0)
);

CREATE TABLE User_Cardio (
	idUSer INTEGER NOT NULL,
    exerciseName VARCHAR(50) NOT NULL,
    exerciseDate DATE,
    PRIMARY KEY (idUser, exerciseName),
    FOREIGN KEY (idUSer) REFERENCES Users (id) ON UPDATE CASCADE,
    FOREIGN KEY (exerciseName) REFERENCES CardioExercise (exerciseName) ON UPDATE CASCADE
);

CREATE TABLE User_Set (
idUSer INTEGER NOT NULL,
	idUSer INTEGER NOT NULL,
    exerciseName VARCHAR(50) NOT NULL,
    setNumber INTEGER NOT NULL,
    exerciseDate DATE,
    PRIMARY KEY (idUser, exerciseName, setNumber),
    FOREIGN KEY (idUSer) REFERENCES Users (id) ON UPDATE CASCADE,
    FOREIGN KEY (exerciseName) REFERENCES ExerciseSet (exerciseName) ON UPDATE CASCADE,
    FOREIGN KEY (setNumber) REFERENCES ExerciseSet (setNumber) ON UPDATE CASCADE
);

/*
	Duda: Preguntar por la tabla User_Set, si debe guardar la cantidad de sets que realiza el usuario.
*/