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

