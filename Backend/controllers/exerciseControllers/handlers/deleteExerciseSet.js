import { mySqlConn } from "../../../bdcon/bdcon.js";

function deleteExerciseSet(uuidExerciseSet) {
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                `SELECT uuid_strength_exercise, set_number FROM exercise_set WHERE uuid_exercise_set = ?`,
                [uuidExerciseSet],
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    if (result.length === 0) {
                        return resolve("NOT_FOUND");
                    }

                    const { uuid_strength_exercise, set_number } = result[0];

                    mySqlConn.query(
                        `DELETE FROM exercise_set WHERE uuid_exercise_set = ?`,
                        [uuidExerciseSet],
                        (deleteError) => {
                            if (deleteError) {
                                return reject(deleteError);
                            }

                            mySqlConn.query(
                                `UPDATE exercise_set SET set_number = set_number - 1 WHERE uuid_strength_exercise = ? AND set_number > ?`,
                                [uuid_strength_exercise, set_number],
                                (renumberError) => {
                                    if (renumberError) {
                                        return reject(renumberError);
                                    }
                                    resolve("OK");
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

export default deleteExerciseSet;
