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