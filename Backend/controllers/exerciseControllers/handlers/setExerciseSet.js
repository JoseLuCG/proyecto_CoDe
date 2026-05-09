import { mySqlConn } from "../../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function setExerciseSet(exerciseUuid, setData) {
    const uuidExerciseSet = uuidV4();
    let sql = `
    INSERT INTO exercise_set(uuid_exercise_set, uuid_strength_exercise, set_number, weight, repeats)
    	VALUES( ?, ?, ?, ?, ?);
    ;`;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [uuidExerciseSet, exerciseUuid, setData.setNumber, setData.setWeight, setData.setRepeats],
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

export default setExerciseSet;