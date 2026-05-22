import { mySqlConn } from "../../../bdcon/bdcon.js";

function getCathegories() {
    let sql = `SELECT * FROM cathegory ORDER BY cathegory_name;`;
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(sql, (error, result) => {
                if (error) { reject(error); }
                else { resolve(result); }
            });
        }
    );
}
export default getCathegories;
