import e, { json } from "express";
import { mySqlConn } from "../bdcon/bdcon.js";

/**
 * Add a user to the database using a json in the request body.
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function addUser(req, res) {
  const { nameUSer, lastNameUser, passwd, phoneNumber } = req.body;
  let sql = `CALL createUser("${nameUSer}", "${lastNameUser}", "${passwd}", "${phoneNumber}")`;
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else console.log("Correcto");
    res.send();
  });
};

/**
 * Delete the user in he database, that corresponds with the id sent in the request body. 
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function removeUser(req, res) {
  const { id } = req.body
  let sql = `CALL deleteUser(${id})`;
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
  });
};

/**
 * Log the user in the aplication.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function checkLogin(req, res) {
  const { phoneNumber, passwd } = req.body;
  let sql = `SELECT logUser("${phoneNumber}", "${passwd}") AS id`;
  mySqlConn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
      console.log(data);
      console.log("correcto");
    }
  });

}

/**
 * Add strength Exercise.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function addStrengthExercise(req, res) {
  const { exerciseName } = req.body;
  let sql = `CALL addStrengthExecise("${exerciseName}")`;
  mySqlConn.query(sql, (err) => {
    if (err) console.log(err);
    else console.log("Correcto");
    res.send();
  });
}

/**
 * Add Cardio Exercise.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function addCardioExercise(req, res) {
  const { exerciseName } = req.body;
  let sql = `CALL addCardioExecise("${exerciseName}")`;
  mySqlConn.query(sql, (err) => {
    if (err) console.log(err);
    else console.log("Correcto");
    res.send();
  });
}

//  addUserEjercicio(cardio o fuerza)
function addUserEjercicio(req, res) {
  let sql = "insert into table.db values ('usuario','ejercicio'"
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
  });
};

/**
 * Get Object with list of Cardio Exercises of an User.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
//  getUserCardio
function getUserCardio(req, res) {
  let sql = "select * from userCardio where id=1";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err, rows);
    else res.write(JSON.stringify(rows));
    res.send();
  });
};

/**
 * Get Object with List of Strength exercises.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
//getUserFuerza
function getUserFuerza(req, res) {
  let sql = "select * from userFuerza where id=2";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err, rows);
    else res.write(JSON.stringify(rows));
    res.send();
  });
};

/**
 * Remove Exercise from User.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
//removeUserEjercicio
function removeUserEjercicio(req, res) {
  let sql = "delete from userejercicio where id=1";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
  });
};

/**
 * Test Controller.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
//  Test
function testPruebas(req, res) {
  console.log("hola");
  res.send("holaa, esto es una prueba");
};

export {
  addUser,
  checkLogin,
  removeUser,
  addStrengthExercise,
  addCardioExercise,
  addUserEjercicio,
  removeUserEjercicio,
  getUserCardio,
  getUserFuerza,
  testPruebas
};
