import { mySqlConn } from "../../../bdcon/bdcon.js";

function deleteCardioExercise(uuidCardioExercise) {
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                `DELETE FROM cardio_exercise WHERE uuid_cardio_exercise = ?`,
                [uuidCardioExercise],
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

export default deleteCardioExercise;
