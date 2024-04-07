import { mysqlConnection } from "../bdcon/bdcon"

removeUser = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}

export {removeUser};