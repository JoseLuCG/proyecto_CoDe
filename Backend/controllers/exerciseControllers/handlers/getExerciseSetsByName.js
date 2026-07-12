import { mySqlConn } from "../../../bdcon/bdcon.js";

function getExerciseSetsByName(exerciseDate, uuidUser, exerciseName) {
    let sql = `
    SELECT
        se.uuid_strength_exercise,
        es.uuid_exercise_set,
        es.set_number,
        es.weight,
        es.repeats
    FROM strength_exercise se
    JOIN exercise_set es
        ON es.uuid_strength_exercise = se.uuid_strength_exercise
    WHERE
        se.exercise_date = STR_TO_DATE(?, '%d-%m-%Y')
        AND se.uuid_user = ?
        AND se.exercise_name = ?
    ORDER BY
        es.set_number;
    ;`;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [exerciseDate, uuidUser, exerciseName],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else if (result.length === 0) {
                        resolve(null);
                    } else {
                        resolve({
                            uuid_strength_exercise: result[0].uuid_strength_exercise,
                            sets: result.map(row => ({
                                uuid_exercise_set: row.uuid_exercise_set,
                                set_number: row.set_number,
                                weight: row.weight,
                                repeats: row.repeats
                            }))
                        });
                    }
                }
            );
        }
    );
}

export default getExerciseSetsByName;
