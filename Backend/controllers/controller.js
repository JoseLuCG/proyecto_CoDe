var mysql = require('../bdcon/bdcon.js');

//  addUser
exports.addUser = function (req, res) {
    mysql.connection.query("insert into table.db values ('usuario','password'");
}



//  checkLogin
exports.checkLogin = (req, res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
},



    //  addUserEjercicio(cardio o fuerza)
    exports.addUserEjercicio = (req, res) => {
        mysqlConnection.connect();
        mysqlConnection.query("insert into table.db values ('usuario','ejercicio'")
        mysqlConnection.end();
    },



    //  getUserCardio
    exports.getUserCardio = (req, res) => {
        mysqlConnection.connect();
        mysqlConnection.query("select * from table.db where")
        mysqlConnection.end();
    },



    //getUserFuerza
    exports.getUserFuerza = (req, res) => {
        mysqlConnection.connect();
        mysqlConnection.query("insert into table.db values ('usuario','password'")
        mysqlConnection.end();
    },



    //removeUserEjercicio
    exports.removeUserEjercicio = (req, res) => {
        mysqlConnection.connect();
        mysqlConnection.query("insert into table.db values ('usuario','password'")
        mysqlConnection.end();
    },



    // ?? RemoveUser
    exports.removeUser = (req, res) => {
        mysqlConnection.connect();
        mysqlConnection.query("delete from ");
        mysqlConnection.end();
    },


    //  Test
    exports.testPruebas = (req, res) => {
        console.log("hola");
        res.send("holaa, esto es una prueba");
    }
