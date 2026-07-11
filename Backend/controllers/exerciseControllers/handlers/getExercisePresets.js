import { mySqlConn } from "../../../bdcon/bdcon.js";

function getExercisePresets(type, cathegory) {
    let sql = `
        SELECT uuid_exercise_preset, exercise_name, exercise_type, uuid_cathegory
        FROM exercise_preset
        WHERE exercise_type = ?
    `;
    const params = [type];

    if (cathegory) {
        sql += ` AND uuid_cathegory = ?`;
        params.push(cathegory);
    }

    sql += ` ORDER BY exercise_name;`;

    return new Promise((resolve, reject) => {
        mySqlConn.query(sql, params, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

export default getExercisePresets;
