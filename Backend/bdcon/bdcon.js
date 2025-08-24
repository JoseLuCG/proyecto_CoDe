import mysql from "mysql2"

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "wakeup",
  user: "root",
  password: "abc123.",
  dateStrings: true
});

export { connection as mySqlConn };

// module.exports {connection, etc}
