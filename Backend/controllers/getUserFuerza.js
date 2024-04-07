import { mysqlConnection } from "../bdcon/bdcon"

getUserFuerza = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}

export {getUserFuerza};