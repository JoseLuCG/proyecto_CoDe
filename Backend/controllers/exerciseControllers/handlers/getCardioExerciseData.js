import { mySqlConn } from "../../../bdcon/bdcon";

function getCardioExercisesInDate(date, user) {
    let sql = `
    SELECT *
        FROM cardio_exercise
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

export default getCardioExercisesInDate;