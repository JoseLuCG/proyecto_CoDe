var mysql = require('mysql');
var connection= mysql.createConnection({
    host:"localhost",
    user:"dbuser",
    password:"pass"
});

//connection.connect();

//connection.end();

export {connection as mysqlConnection};