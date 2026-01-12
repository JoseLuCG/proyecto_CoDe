import { mySqlConn } from "../../../bdcon/bdcon.js";

function getStrengthExerciseInDate(date, user) {
    let sql = `
    SELECT *
        FROM strength_exercise
            WHERE uuid_user = ?
            AND exercise_date = ?
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
                        const data = result;
                        resolve(data);
                    }
                }
            );
        }
    );
}

export default getStrengthExerciseInDate;