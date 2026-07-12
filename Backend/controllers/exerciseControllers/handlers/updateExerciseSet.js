import { mySqlConn } from "../../../bdcon/bdcon.js";

function updateExerciseSet(uuidExerciseSet, weight, repeats) {
    let sql = `
    UPDATE exercise_set
    SET weight = ?, repeats = ?
    WHERE uuid_exercise_set = ?;
    ;`;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [weight, repeats, uuidExerciseSet],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.affectedRows > 0 ? "OK" : "NOT_FOUND");
                    }
                }
            );
        }
    );
}

export default updateExerciseSet;
