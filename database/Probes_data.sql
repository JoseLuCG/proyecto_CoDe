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


INSERT INTO cathegory (uuid_cathegory, cathegory_name)
	VALUES(UUID(), "PECHO");

INSERT INTO cathegory (uuid_cathegory, cathegory_name)
	VALUES(UUID(), "PIERNA");
INSERT INTO cathegory (uuid_cathegory, cathegory_name)
	VALUES(UUID(), "ABS");
INSERT INTO cathegory (uuid_cathegory, cathegory_name)
	VALUES(UUID(), "ESPALDA");
INSERT INTO cathegory (uuid_cathegory, cathegory_name)
	VALUES(UUID(), "HOMBRO");
INSERT INTO cathegory (uuid_cathegory, cathegory_name)
	VALUES(UUID(), "BRAZO");

-- EXERCISE PRESETS --
-- PECHO
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Press Banca", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PECHO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Press Inclinado Mancuernas", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PECHO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Aperturas Mancuernas", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PECHO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Fondos", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PECHO"));

-- PIERNA
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Sentadilla", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PIERNA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Peso Muerto", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PIERNA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Prensa Pierna", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PIERNA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Zancadas", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PIERNA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Extension Cuadriceps", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PIERNA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Curl Femoral", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "PIERNA"));

-- ABS
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Plancha", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ABS"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Crunches", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ABS"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Elevacion Piernas", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ABS"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Russian Twist", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ABS"));

-- ESPALDA
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Remo Barra", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ESPALDA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Dominadas", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ESPALDA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Jalon al Pecho", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ESPALDA"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Remo Mancuerna", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "ESPALDA"));

-- HOMBRO
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Press Militar", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "HOMBRO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Elevaciones Laterales", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "HOMBRO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Pajaros", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "HOMBRO"));

-- BRAZO
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Curl Biceps", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "BRAZO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Curl Martillo", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "BRAZO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Press Frances", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "BRAZO"));
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Fondos Triceps", "strength", (SELECT uuid_cathegory FROM cathegory WHERE cathegory_name = "BRAZO"));

-- CARDIO (no category)
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Carrera", "cardio", NULL);
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Bicicleta", "cardio", NULL);
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Natacion", "cardio", NULL);
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Eliptica", "cardio", NULL);
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Remo", "cardio", NULL);
INSERT INTO exercise_preset (uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory)
    VALUES(UUID(), "Cuerda Saltar", "cardio", NULL);