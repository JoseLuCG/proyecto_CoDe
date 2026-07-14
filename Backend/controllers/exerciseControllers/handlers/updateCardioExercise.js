import { mySqlConn } from "../../../bdcon/bdcon.js";

function updateCardioExercise(uuidCardioExercise, exerciseName, time, distance, intensity) {
    let sql = `
    UPDATE cardio_exercise
    SET exercise_name = ?, exercise_time = ?, distance = ?, intensity = ?
    WHERE uuid_cardio_exercise = ?;
    `;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [exerciseName, time, distance, intensity, uuidCardioExercise],
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

export default updateCardioExercise;
