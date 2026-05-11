import setFoodData from "./handlers/setFoodData.js";

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

export {
    addFood
}