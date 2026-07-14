import { mySqlConn } from "../../../bdcon/bdcon.js";

function updateFoodData(uuidFoodIntake, foodName, kcal, proteins, carbohydrates, fat) {
    let sql = `
    UPDATE food_intake
    SET food_name = ?, kcal = ?, proteins = ?, carbohydrates = ?, fat = ?
    WHERE uuid_food_intake = ?;
    `;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [foodName, kcal, proteins, carbohydrates, fat, uuidFoodIntake],
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

export default updateFoodData;
