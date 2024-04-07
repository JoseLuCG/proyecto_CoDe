import { mysqlConnection } from "../bdcon/bdcon"

//  addUser
addUser = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}



//  checkLogin
checkLogin = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}



//  addUserEjercicio(cardio o fuerza)
addUserEjercicio = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','ejercicio'")
    mysqlConnection.end();
}



//  getUserCardio
getUserCardio = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("select * from table.db where")
    mysqlConnection.end();
}



//getUserFuerza
getUserFuerza = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}



//removeUserEjercicio
removeUserEjercicio = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}



// ?? RemoveUser
removeUser = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("delete from ");
    mysqlConnection.end();
}


//  Test
testPruebas = (req,res) => {
    res.send("Holaa, Test");
}


export {addUser,removeUser,checkLogin,addUserEjercicio,removeUserEjercicio,getUserCardio,getUserFuerza,testPruebas};