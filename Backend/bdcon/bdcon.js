var mysql = require('mysql');
var connection= mysql.createConnection({
    host:"localhost",
    user:"dbuser",
    password:"pass"
});

exports.connection=connection;
//connection.connect();

//connection.end();
