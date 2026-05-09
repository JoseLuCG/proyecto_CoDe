INSERT INTO Users(nameUser, lastNameUser, passwd, phoneNumber)
	VALUES('Pepe','Rio','abc','600000001');

select logUser('600000001', 'abc') as id;

INSERT INTO user(uuid_user, name_user, last_name_user, email, phone_number, user_password)
	VALUES(UUID(), "User_test", "test", "emailtest@test.tt", "600100200", "abc");

SELECT
    se.uuid_strength_exercise,
    se.exercise_name,
    se.uuid_user,
    se.exercise_date,
    es.uuid_exercise_set,
    es.set_number,
    es.weight,
    es.repeats
FROM strength_exercise se
JOIN exercise_set es
    ON es.uuid_strength_exercise = se.uuid_strength_exercise
WHERE
    se.uuid_user = '7c5edbd6-20c9-4b59-b4cb-0d57a0134aaa'
    AND se.exercise_date = '2026-01-12'
ORDER BY
    se.uuid_strength_exercise,
    es.set_number;

INSERT INTO strength_exercise(uuid_strength_exercise, exercise_date, uuid_user, exercise_name)
	VALUES(UUID(), "2026-01-15", '683eb49d-083c-11f1-a265-4074e0b64cdd', "Exercise Example" );

INSERT INTO exercise_set(uuid_exercise_set, uuid_strength_exercise, set_number, weight, repeats)
	VALUES(UUID(), "79e12e19-0843-11f1-a265-4074e0b64cdd", 1, 30, 14);


DELETE FROM strength_exercise 
	WHERE uuid_strength_exercise = "51f1f8c2-9e23-4298-a83f-bec666d7e579";
