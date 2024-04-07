import { mysqlConnection } from "../bdcon/bdcon"

addUserEjercicio = (req,res) => {
    mysqlConnection.connect();
    mysqlConnection.query("insert into table.db values ('usuario','ejercicio'")
    mysqlConnection.end();
}

export {addUserEjercicio};