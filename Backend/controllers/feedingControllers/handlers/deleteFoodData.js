import { mySqlConn } from "../../../bdcon/bdcon.js";

function deleteFoodData(uuidFoodIntake) {
    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                `DELETE FROM food_intake WHERE uuid_food_intake = ?`,
                [uuidFoodIntake],
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

export default deleteFoodData;
