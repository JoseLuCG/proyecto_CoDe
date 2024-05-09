SET GLOBAL log_bin_trust_function_creators = 1;

/* Procedure that inserts a new user into the database. */
DELIMITER $$
DROP PROCEDURE IF EXISTS createUser; $$
CREATE PROCEDURE createUser(p_name VARCHAR(40), p_lastName VARCHAR(40), p_password VARCHAR(40), p_phoneNumber VARCHAR(9))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SHOW ERRORS;
        ROLLBACK;
	END;

	START TRANSACTION;
		INSERT INTO Users (nameUser, lastNAmeUSer, passwd, phoneNumber)
			VALUES (p_name, p_lastName, p_password, p_phoneNumber);
	COMMIT;
END; $$

/* Procedure that delete the user from the database that matches the id passed as a parameter. */
DELIMITER $$
DROP PROCEDURE IF EXISTS deleteUser; $$
CREATE PROCEDURE deleteUser (p_id INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SHOW ERRORS;
        ROLLBACK;
	END;
    
	START TRANSACTION;
		DELETE FROM Users
		WHERE id = p_id;
	COMMIT;
END; $$

/* Function that log the user. */
DELIMITER $$
DROP FUNCTION IF EXISTS logUser; $$
CREATE FUNCTION logUser (p_phoneNumber VARCHAR(9), p_password VARCHAR(40)) RETURNS INT
BEGIN 
    DECLARE v_idUser INT default 0;
    SELECT id 
        INTO v_idUser
        FROM Users
        WHERE passwd = p_password
        and phoneNumber = p_phoneNumber;
    RETURN (v_idUser);
END;$$

/* Procedure that insert a new strength exercise. */
DELIMITER $$
DROP PROCEDURE IF EXISTS addStrengthExecise; $$
CREATE PROCEDURE addStrengthExecise (p_exerciseName VARCHAR(50))
BEGIN
	DECLARE v_existsExercise INT;
    
    SELECT COUNT(*) 
		INTO v_existsExercise
		FROM StrengthExercise
        WHERE exerciseName = p_exerciseName;
	
    IF (v_existsExercise > 0) THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'The exercise already exists';
	ELSE 
		INSERT INTO StrengthExercise(exerciseName)
			VALUES(p_exerciseName);	
    END IF;
END; $$

/* Procedure that insert a new cardio exercise. */
DELIMITER $$
DROP PROCEDURE IF EXISTS addCardioExecise; $$
CREATE PROCEDURE addCardioExecise (p_exerciseName VARCHAR(50))
BEGIN
	DECLARE v_existsExercise INT;
    
    SELECT COUNT(*) 
		INTO v_existsExercise
		FROM CardioExercise
        WHERE exerciseName = p_exerciseName;
	
    IF (v_existsExercise > 0) THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'The exercise already exists';
	ELSE 
		INSERT INTO CardioExercise(exerciseName)
			VALUES(p_exerciseName);	
    END IF;
END; $$

/* Procedure that add the registration of a user on a specific day. */
DELIMITER $$
DROP PROCEDURE IF EXISTS addUserStrengthExercise; $$
CREATE PROCEDURE addUserStrengthExercise (p_exerciseDate DATE, p_IdUser INT, p_setNumber INT, p_exerciseName VARCHAR(50), p_weight DOUBLE, p_repeats INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SHOW ERRORS;
        ROLLBACK;
	END;
    
    START TRANSACTION;
		INSERT INTO User_Strength (exerciseDate, idUser, setNumber, exerciseName, weight, repeats)
			VALUES (p_exerciseDate, p_IdUser, p_setNumber, p_exerciseName, p_weight, p_repeats);
	COMMIT;
END; $$

/**/
DELIMITER $$
DROP PROCEDURE IF EXISTS addUserCardioExercise; $$
CREATE PROCEDURE addUserCardioExercise (p_exerciseDate DATE, p_IdUser INT, p_exerciseName VARCHAR(50), p_intensity DOUBLE, p_exerciseTime TIME, p_distance DOUBLE)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SHOW ERRORS;
        ROLLBACK;
	END;
    
    START TRANSACTION;
		INSERT INTO User_Cardio (exerciseDate, idUser, exerciseName, intensity, exerciseTime, distance)
			VALUES (p_exerciseDate, p_IdUser, p_exerciseName, p_intensity, p_exerciseTime, p_distance);
	COMMIT;
END; $$












