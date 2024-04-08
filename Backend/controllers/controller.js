import { mySqlConn } from "../bdcon/bdcon";

//  addUser
addUser = function (req, res) {
  mySqlConn.query("insert into table.db values ('usuario','password'");
};

//  checkLogin
checkLogin = (req, res) => {
  mySqlConn.query("insert into table.db values ('usuario','password'");
};

//  addUserEjercicio(cardio o fuerza)
addUserEjercicio = (req, res) => {
  mySqlConn.query("insert into table.db values ('usuario','ejercicio'");
};

//  getUserCardio
getUserCardio = (req, res) => {
  mySqlConn.query("select * from table.db where");
};

//getUserFuerza
getUserFuerza = (req, res) => {
  mySqlConn.query("insert into table.db values ('usuario','password'");
};

//removeUserEjercicio
removeUserEjercicio = (req, res) => {
  mySqlConn.query("insert into table.db values ('usuario','password'");
};

// ?? RemoveUser
removeUser = (req, res) => {
  mySqlConn.query.query("delete from ");
};

//  Test
testPruebas = (req, res) => {
  console.log("hola");
  res.send("holaa, esto es una prueba");
};

controllers.export = {
  addUser,
  checkLogin,
  removeUser,
  addUserEjercicio,
  removeUserEjercicio,
  getUserCardio,
  getUserFuerza,
};
