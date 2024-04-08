import { mySqlConn } from "../bdcon/bdcon.js";

//  addUser
function addUser(req, res) {
  mySqlConn.query("insert into users (nameuser,passwd,lastnameuser,phonenumber) values ('joselu','abc123.','conde','667767585')");
};

//  checkLogin
function checkLogin(req, res) {
  mySqlConn.query("select nameuser,passwd from users where nameuser='joselu' AND passwd='abc123.'");
};

//  addUserEjercicio(cardio o fuerza)
function addUserEjercicio(req, res) {
  mySqlConn.query("insert into table.db values ('usuario','ejercicio'");
};

//  getUserCardio
function getUserCardio(req, res) {
  mySqlConn.query("select * from table.db where");
};

//getUserFuerza
function getUserFuerza(req, res) {
  mySqlConn.query("insert into table.db values ('usuario','password'");
};

//removeUserEjercicio
function removeUserEjercicio(req, res) {
  mySqlConn.query("insert into table.db values ('usuario','password'");
};

// ?? RemoveUser
function removeUser(req, res) {
  mySqlConn.query.query("delete from ");
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
