var mysql = require('../bdcon/bdcon.js');

//  addUser
exports.addUser = function (req, res) {
    mysql.connection.query("insert into table.db values ('usuario','password'");
}



//  checkLogin
exports.checkLogin = (req, res) => {
    mysqlConnection.query("insert into table.db values ('usuario','password'");
}



//  addUserEjercicio(cardio o fuerza)
exports.addUserEjercicio = (req, res) => {
    mysqlConnection.query("insert into table.db values ('usuario','ejercicio'");
}



//  getUserCardio
exports.getUserCardio = (req, res) => {
    mysqlConnection.query("select * from table.db where");
}



//getUserFuerza
exports.getUserFuerza = (req, res) => {
    mysqlConnection.query("insert into table.db values ('usuario','password'");
}



//removeUserEjercicio
exports.removeUserEjercicio = (req, res) => {
    mysqlConnection.query("insert into table.db values ('usuario','password'");
}



// ?? RemoveUser
exports.removeUser = (req, res) => {
    mysqlConnection.query("delete from ");
}


//  Test
exports.testPruebas = (req, res) => {
    console.log("hola");
    res.send("holaa, esto es una prueba");
}
