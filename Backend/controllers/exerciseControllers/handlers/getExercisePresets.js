import { mySqlConn } from "../../../bdcon/bdcon.js";

function getExercisePresets(type, cathegory, user) {
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

    if (user && cathegory) {
        sql += `
            UNION
            SELECT NULL AS uuid_exercise_preset, exercise_name, 'strength' AS exercise_type, uuid_cathegory
            FROM (
                SELECT DISTINCT exercise_name, uuid_cathegory
                FROM strength_exercise
                WHERE uuid_user = ? AND uuid_cathegory = ?
            ) AS custom_exercises
        `;
        params.push(user, cathegory);
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
