import { mySqlConn } from "../../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function setStrengthExerciseData(data) {
    const uuidStrengthExercise = uuidV4();
    const cathegoryValue = data.uuidCathegory || null;
    let sql = `
    INSERT INTO strength_exercise(uuid_strength_exercise, exercise_date, uuid_user, exercise_name, uuid_cathegory)
	    VALUES( ?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ? )
    ;`;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [uuidStrengthExercise, data.exerciseDate, data.exerciseUser, data.exerciseName, cathegoryValue],
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(uuidStrengthExercise);
                    }
                }
            );
        }
    );
}

export default setStrengthExerciseData;