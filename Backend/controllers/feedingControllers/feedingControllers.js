import setFoodData from "./handlers/setFoodData.js";
import getFoodsInDate from "./handlers/getFoodData.js";

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

export {
    addFood,
    getFoods
}