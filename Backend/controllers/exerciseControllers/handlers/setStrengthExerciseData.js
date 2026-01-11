import { mySqlConn } from "../../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function setStrengthExerciseData(data) {
    const uuidStrengthExercise = uuidV4();
    let sql = `
    INSERT INTO strength_exercise(uuid_strength_exercise, exercise_date, uuid_user, set_number, exercise_name, weight, repeats)
	VALUES( ?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ?, ?, ?);
    `;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [uuidStrengthExercise, data.exerciseDate, data.exerciseUser, data.exerciseSetNumber, data.exerciseName, data.exerciseWeight, data.exerciseRepeats],
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve("OK");
                    }
                }
            );
        }
    );
}

export default setStrengthExerciseData;