import { mySqlConn } from "../../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function setFoodData(data) {
    const uuidFoodIntake = uuidV4();
    let sql = `
    INSERT INTO food_intake (uuid_food_intake, intake_date, uuid_user, food_name, kcal, proteins, carbohydrates, fat)
        VALUES ( ?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?, ?, ?, ?, ?);
    `;

    return new Promise(
        (resolve, reject) => {
            mySqlConn.query(
                sql,
                [uuidFoodIntake, data.intakeDate, data.uuidUser, data.foodName, data.kcal, data.proteins, data.carbohydrates, data.fat],
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

export default setFoodData;
