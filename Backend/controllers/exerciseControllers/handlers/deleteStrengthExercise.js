import { mySqlConn } from "../../../bdcon/bdcon.js";

function deleteStrengthExercise(uuidStrengthExercise) {
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                `DELETE FROM exercise_set WHERE uuid_strength_exercise = ?`,
                [uuidStrengthExercise],
                (deleteSetsError) => {
                    if (deleteSetsError) {
                        return reject(deleteSetsError);
                    }

                    mySqlConn.query(
                        `DELETE FROM strength_exercise WHERE uuid_strength_exercise = ?`,
                        [uuidStrengthExercise],
                        (deleteExerciseError, result) => {
                            if (deleteExerciseError) {
                                return reject(deleteExerciseError);
                            }
                            if (result.affectedRows === 0) {
                                return resolve("NOT_FOUND");
                            }
                            resolve("OK");
                        }
                    );
                }
            );
        }
    );
}

export default deleteStrengthExercise;
