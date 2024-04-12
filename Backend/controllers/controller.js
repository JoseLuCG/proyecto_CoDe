import { json } from "express";
import { mySqlConn } from "../bdcon/bdcon.js";

/**
 * Add a user to the database using a json in the request body.
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function addUser(req, res) {
  const {nameUSer, lastNameUser, passwd, phoneNumber} = req.body
  let sql = `CALL createUser("${nameUSer}", "${lastNameUser}", "${passwd}", "${phoneNumber}")`;
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else console.log("Correcto");
    res.send();
  });
};

//  checkLogin
function checkLogin(req, res) {
  let sql = "select nameuser,passwd from users where nameuser='joselu' AND passwd='abc123.' limit 1";
  mySqlConn.query(sql, function (err, rows) {
    if (err) console.log(err);
    else {
      if (rows.length > 0) res.write(JSON.stringify(rows));
      else res.write("Usuario o Contraseña Incorrecto");
    }
    res.send();
  });

};

//  addUserEjercicio(cardio o fuerza)
function addUserEjercicio(req, res) {
  let sql = "insert into table.db values ('usuario','ejercicio'"
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
  });
};

//  getUserCardio
function getUserCardio(req, res) {
  let sql = "select * from userCardio where id=1";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err, rows);
    else res.write(JSON.stringify(rows));
    res.send();
  });
};

//getUserFuerza
function getUserFuerza(req, res) {
  let sql = "select * from userFuerza where id=2";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err, rows);
    else res.write(JSON.stringify(rows));
    res.send();
  });
};

//removeUserEjercicio
function removeUserEjercicio(req, res) {
  let sql = "delete from userejercicio where id=1";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
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

//  Test
function testPruebas(req, res) {
  console.log("hola");
  res.send("holaa, esto es una prueba");
};

export {
  addUser,
  checkLogin,
  removeUser,
  addUserEjercicio,
  removeUserEjercicio,
  getUserCardio,
  getUserFuerza,
  testPruebas
};
