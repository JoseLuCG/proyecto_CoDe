import { mySqlConn } from "../bdcon/bdcon.js";

//  addUser
function addUser(req, res) {
  let sql = "insert into users (nameuser,passwd,lastnameuser,phonenumber) values ('joselu','abc123.','conde','667767585')";

  mySqlConn.query(sql, function (err) {
    if (err) res.write(err);
    else res.write("Correcto");
  });
};

//  checkLogin
function checkLogin(req, res) {
  let sql = "select nameuser,passwd from users where nameuser='joselu' AND passwd='abc123.'";
  mySqlConn.query(sql, function (err, rows) {
    if (err) console.log(err);
    else res.write(`Correcto`);
    if (rows.length > 0) res.write("loggeado");
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
    if (err) console.log(err);
    else res.send("Correcto");
  });
};

//getUserFuerza
function getUserFuerza(req, res) {
  let sql = "select * from userFuerza where id=2";
  mySqlConn.query(sql, function (err) {
    if (err) console.log(err);
    else res.send("Correcto");
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

// ?? RemoveUser
function removeUser(req, res) {
  let sql = "delete from user where id=1";
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
