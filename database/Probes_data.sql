INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Pepe','Rio','abc','600000001');

select logUser('600000001', 'abc') as id;

INSERT INTO user(uuid_user, name_user, last_name_user, email, phone_number, user_password)
	VALUES(UUID(), "User_test", "test", "emailtest@test.tt", "600100200", "abc");

