import getStrengthExerciseInDate from "./handlers/getStrengthExerciseData.js";
import setExerciseSet from "./handlers/setExerciseSet.js";
import setStrengthExerciseData from "./handlers/setStrengthExerciseData.js";
import { groupSetByExercise } from "./mappers/strenghtMappers.js";

async function addStrengthExecise(req, res) {
    const exerciseData = {
        exerciseUser: req.body.exerciseUser,
        exerciseName: req.body.exerciseName,
        exerciseDate: req.body.exerciseDate,
        exerciseSet: req.body.set
    }
 
    try {
        const strenghtExerciseSaved = await setStrengthExerciseData(exerciseData);
        const setedExerciseSet = await  setExerciseSet(strenghtExerciseSaved, exerciseData.exerciseSet);
        if (setedExerciseSet == 'OK') {
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
        const result = groupSetByExercise(exercises);
        
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export {
    addStrengthExecise,
    getStrengthExercises
}