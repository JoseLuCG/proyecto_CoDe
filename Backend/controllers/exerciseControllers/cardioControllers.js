import setCardioExerciseData from "./handlers/setCardioExerciseData.js";
import getCardioExercisesInDate from "./handlers/getCardioExerciseData.js";
import updateCardioExerciseHandler from "./handlers/updateCardioExercise.js";
import deleteCardioExerciseHandler from "./handlers/deleteCardioExercise.js";

async function addCardioExercise(req, res) {
    const exerciseData = {
        exerciseUser: req.body.exerciseUser,
        exerciseName: req.body.exerciseName,
        exerciseDate: req.body.exerciseDate,
        exerciseTime: req.body.exerciseTime,
        exerciseDistance: req.body.exerciseDistance,
        exerciseIntensity: req.body.exerciseIntensity
    };

    try {
        const promise = await setCardioExerciseData(exerciseData);
        if (promise == 'OK') {
            res.sendStatus(200);
            console.log("Exercise saved!");
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getCardioExercises(req, res) {
    const { date, user } = req.params;

    try {
        const exercises = await getCardioExercisesInDate(date, user);
        res.json(exercises);
    } catch (error) {
        console.error(error);
        sendStatus(500);
    }
}

async function updateCardioExercise(req, res) {
    const { uuid } = req.params;
    const { exerciseName, exerciseTime, exerciseDistance, exerciseIntensity } = req.body;

    try {
        const result = await updateCardioExerciseHandler(uuid, exerciseName, exerciseTime, exerciseDistance, exerciseIntensity);
        if (result === 'NOT_FOUND') {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function deleteCardioExercise(req, res) {
    const { uuid } = req.params;

    try {
        const result = await deleteCardioExerciseHandler(uuid);
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
    addCardioExercise,
    getCardioExercises,
    updateCardioExercise,
    deleteCardioExercise
}