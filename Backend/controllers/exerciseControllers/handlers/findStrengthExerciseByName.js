import { mySqlConn } from "../../../bdcon/bdcon.js";

function findStrengthExerciseByName(exerciseDate, uuidUser, exerciseName) {
    let sql = `
    SELECT uuid_strength_exercise
    FROM strength_exercise
    WHERE exercise_date = STR_TO_DATE(?, '%d-%m-%Y')
      AND uuid_user = ?
      AND exercise_name = ?
    LIMIT 1;
    ;`;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [exerciseDate, uuidUser, exerciseName],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.length > 0 ? result[0].uuid_strength_exercise : null);
                    }
                }
            );
        }
    );
}

export default findStrengthExerciseByName;
