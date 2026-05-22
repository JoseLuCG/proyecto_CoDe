import { mySqlConn } from "../../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function setCathegoryData(cathegoryName) {
    const uuidCathegory = uuidV4();
    let sql = `
    INSERT INTO cathegory (uuid_cathegory, cathegory_name)
        VALUES (?, ?);
    `;
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(sql, [uuidCathegory, cathegoryName],
                (error) => {
                    if (error) { reject(error); }
                    else { resolve("OK"); }
                }
            );
        }
    );
}
export default setCathegoryData;
