import getStrengthExerciseInDate from "./handlers/getStrengthExerciseData.js";
import setStrengthExerciseData from "./handlers/setStrengthExerciseData.js";

async function addStrengthExecise(req, res) {
    const exerciseData = {
        exerciseUser: req.body.exerciseUser,
        exerciseName: req.body.exerciseName,
        exerciseDate: req.body.exerciseDate,
        exerciseSetNumber: req.body.exerciseSetNumber,
        exerciseWeight: req.body.exerciseWeight,
        exerciseRepeats: req.body.exerciseRepeats
    }
    
    try {
        const promise = await setStrengthExerciseData(exerciseData);
        if (promise == 'OK') {
            res.sendStatus(200);
            console.log("Exercise saved!");
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getStrengthExercises(req, res) {
    const {date, user } = req.params;
    
    try {
        const exercises = await getStrengthExerciseInDate(date, user);
        res.json(exercises)
    } catch (error) {
        console.error(error);
        sendStatus(500);
    }
}

export {
    addStrengthExecise,
    getStrengthExercises
}