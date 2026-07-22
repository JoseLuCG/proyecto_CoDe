import { mySqlConn } from "../../../bdcon/bdcon.js";

function getMonthlyActivity(year, month, user) {
    const paddedMonth = String(month).padStart(2, '0');
    const startDate = `${year}-${paddedMonth}-01`;
    const endDate = `${year}-${paddedMonth}-31`;

    let sql = `
        SELECT
            activity_date AS date,
            MAX(has_exercise) AS hasExercise,
            MAX(has_food) AS hasFood
        FROM (
            SELECT exercise_date AS activity_date, 1 AS has_exercise, 0 AS has_food
                FROM cardio_exercise
                WHERE uuid_user = ? AND exercise_date >= ? AND exercise_date <= ?
            UNION ALL
            SELECT exercise_date AS activity_date, 1 AS has_exercise, 0 AS has_food
                FROM strength_exercise
                WHERE uuid_user = ? AND exercise_date >= ? AND exercise_date <= ?
            UNION ALL
            SELECT intake_date AS activity_date, 0 AS has_exercise, 1 AS has_food
                FROM food_intake
                WHERE uuid_user = ? AND intake_date >= ? AND intake_date <= ?
        ) combined
        GROUP BY activity_date
        ORDER BY activity_date
    ;`;

    return new Promise((resolve, reject) => {
        mySqlConn.query(
            sql,
            [user, startDate, endDate, user, startDate, endDate, user, startDate, endDate],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const dates = result.map(row => ({
                        date: row.date,
                        hasExercise: row.hasExercise === 1,
                        hasFood: row.hasFood === 1,
                    }));
                    resolve(dates);
                }
            }
        );
    });
}

export default getMonthlyActivity;
