var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "usuariosprueba",
    user: "root",
    password: "abc123."
});

module.exports = {
    connection
}
