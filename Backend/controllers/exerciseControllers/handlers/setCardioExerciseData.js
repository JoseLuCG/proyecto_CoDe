import { mySqlConn } from "../../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function setCardioExerciseData(data) {
    const uuidCardioExercise = uuidV4();
    let sql = `
    INSERT INTO cardio_exercise (uuid_cardio_exercise, exercise_date, uuid_user, exercise_name, intensity, exercise_time, distance)
        VALUES ( ?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ?, ?, ?);
    `;

    return new Promise(
        (resolve, reject) => {
              mySqlConn.query(
                sql,
                [ uuidCardioExercise, data.exerciseDate, data.exerciseUser, data.exerciseName, data.exerciseIntensity, data.exerciseTime, data.exerciseDistance ],
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

export default setCardioExerciseData;