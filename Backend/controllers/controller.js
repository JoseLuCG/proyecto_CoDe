import e, { json } from "express";
import { mySqlConn } from "../bdcon/bdcon.js";

/**
 * Delete the user in he database, that corresponds with the id sent in the request body. 
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function removeUser(req, res) {
  const { idUser } = req.body
  let sql = `CALL deleteUser(${idUser})`;
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
function getUser(req,res) {
  const {phoneNumber,passwd} =req.body;
  let sql=`SELECT * from Users where phoneNumber="${phoneNumber}" AND passwd="${passwd}"`;
  mySqlConn.query(sql,(err,data)=> {
    if (err) console.log(err);
    else res.send(JSON.stringify(data));
  });
}

/**
 * Add a strength exercise in data base.
 * @param {*} req 
 * @param {*} res 
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
 * Add a cardio exercise in data base.
 * @param {*} req 
 * @param {*} res 
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

/**
 * Add the registration of a user on a specific day of the strength exercise.
 * @param {*} req 
 * @param {*} res 
 */
function addUserStrengthExercise(req, res) {
  const { exerciseDate, idUser, setNumber, exerciseName, weight, repeats } = req.body;
  let sql = `CALL addUserStrengthExercise(
    '${exerciseDate}',
    ${idUser},
    ${setNumber},
    '${exerciseName}',
    ${weight}, 
    ${repeats})`;
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
  });
}

/**
 * Add the registration of a user on a specific day of the cardio exercise.
 * @param {*} req 
 * @param {*} res 
 */
function addUserCardioExercise (req, res) {
  const {exerciseDate, idUser, exerciseName, intensity, exerciseTime, distance} = req.body;
  let sql = `CALL addUserCardioExercise(
    '${exerciseDate}',
    ${idUser},
    '${exerciseName}',
    ${intensity}, 
    '${exerciseTime}',
    ${distance})`;
  mySqlConn.query(sql, function (err){
    if (err) console.log(err);
    else res.send("Correcto");
  });
}

/**
 * Get Object with list of Cardio Exercises of an User.
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function getUserCardio(req, res) {
  const { idUser } = req.body;
  let sql = `select * from User_Cardio where idUser=${idUser}`;
  mySqlConn.query(sql, function (err, rows) {
    if (err) console.log(err);
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
  const { idUser } = req.body;
  let sql = `select * from User_Strength where idUser=${idUser}`;
  mySqlConn.query(sql, function (err, rows) {
    if (err) console.log(err);
    else {
      res.write(JSON.stringify(rows));
      res.send();
      console.log("GetFuerza Correcto" + idUser + JSON.stringify(rows));
    }
  });
};

/**
 * Remove Exercise from User.
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
//removeUserEjercicio
function removeUserEjercicio(req, res) {
  const {exerciseDate, idUser, exerciseName} = req.body;
  let sql = `CALL deleteCardioExercise('${exerciseDate}', ${idUser}, '${exerciseName}');`;
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
  getUser,
  removeUser,
  addStrengthExercise,
  addCardioExercise,
  addUserStrengthExercise,
  addUserCardioExercise,
  removeUserEjercicio,
  getUserCardio,
  getUserFuerza,
  testPruebas
};
