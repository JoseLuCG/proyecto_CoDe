import { mySqlConn } from "../../../bdcon/bdcon.js";

function getStrengthExerciseInDate(date, user) {
    let sql = `
        SELECT
            se.uuid_strength_exercise,
            se.exercise_name,
            se.uuid_user,
            se.exercise_date,
            es.uuid_exercise_set,
            es.set_number,
            es.weight,
            es.repeats
        FROM strength_exercise se
        JOIN exercise_set es
            ON es.uuid_strength_exercise = se.uuid_strength_exercise
        WHERE
            se.uuid_user = ?
            AND se.exercise_date = ?
        ORDER BY
            se.uuid_strength_exercise,
            es.set_number;
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