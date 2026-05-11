import { mySqlConn } from "../../../bdcon/bdcon.js";

function getFoodsInDate(date, user) {
    let sql = `
    SELECT *
        FROM food_intake
            WHERE uuid_user = ?
            AND intake_date = ?
    ;`;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [user, date],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        }
    );
}

export default getFoodsInDate;
