import setFoodData from "./handlers/setFoodData.js";
import getFoodsInDate from "./handlers/getFoodData.js";
import updateFoodDataHandler from "./handlers/updateFoodData.js";
import deleteFoodDataHandler from "./handlers/deleteFoodData.js";

async function addFood(req, res) {
    const foodData = {
        uuidUser: req.body.uuidUser,
        intakeDate: req.body.intakeDate,
        foodName: req.body.foodName,
        kcal: req.body.kcal,
        proteins: req.body.proteins,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat
    };

    try {
        const result = await setFoodData(foodData);
        if (result == 'OK') {
            res.sendStatus(200);
            console.log("Food saved!");
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getFoods(req, res) {
    const { date, user } = req.params;

    try {
        const foods = await getFoodsInDate(date, user);
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function updateFood(req, res) {
    const { uuid } = req.params;
    const { foodName, kcal, proteins, carbohydrates, fat } = req.body;

    try {
        const result = await updateFoodDataHandler(uuid, foodName, kcal, proteins, carbohydrates, fat);
        if (result === 'NOT_FOUND') {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function deleteFood(req, res) {
    const { uuid } = req.params;

    try {
        const result = await deleteFoodDataHandler(uuid);
        if (result === 'NOT_FOUND') {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export {
    addFood,
    getFoods,
    updateFood,
    deleteFood
}