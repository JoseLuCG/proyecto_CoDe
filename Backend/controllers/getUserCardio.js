import { mysqlConnection } from "../bdcon/bdcon"

getUserCardio = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','password'")
    mysqlConnection.end();
}

export {getUserCardio};