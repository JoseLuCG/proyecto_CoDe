import { mySqlConn } from "../../../bdcon/bdcon.js";

function deleteCathegoryData(uuid) {
    let sql = `DELETE FROM cathegory WHERE uuid_cathegory = ?;`;
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(sql, [uuid],
                (error) => {
                    if (error) { reject(error); }
                    else { resolve("OK"); }
                }
            );
        }
    );
}
export default deleteCathegoryData;
