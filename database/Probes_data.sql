INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Pepe','Rio','abc','600000001');
INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Roberto','García','abc','600000002');
INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Miguel','Lopez','abc','600000003');
INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Carlos','Herrera','abc','600000004');
INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Hugo','Boss','abc','600000005');
    
CALL deleteUser(1);
CALL deleteUser(2);
CALL deleteUser(3);
CALL deleteUser(4);
CALL deleteUser(5);

CALL createUser('Pepe','Rio','abc','600000001');
CALL createUser('Roberto','García','abc','600000002');
CALL createUser('Miguel','Lopez','abc','600000003');
CALL createUser('Carlos','Herrera','abc','600000004');
CALL createUser('Hugo','Boss','abc','600000005');

select logUser('600000001', 'abc') as id;

CALL addStrengthExecise ("Peso Muerto");
CALL addStrengthExecise ("Bíceps Mancuernas");

CALL addCardioExecise("Correr");
CALL addCardioExecise("Caminar");
CALL addCardioExecise("Nadar");
CALL addCardioExecise("Escalera");

-- addUserStrengthExercise (exerciseDate,IdUser,setNumber,exerciseName,weight,repeats)
CALL addUserStrengthExercise('2024-04-25',6,1,'Peso Muerto', 50, 10);



-- INSERT INTO User_Cardio (exerciseDate, idUser, exerciseName, intensity, exerciseTime, distance)
CALL addUserCardioExercise('2024-04-16', 6, 'Correr', 5, '00:30:00', 2.30);