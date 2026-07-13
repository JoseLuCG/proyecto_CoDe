import getStrengthExerciseInDate from "./handlers/getStrengthExerciseData.js";
import findStrengthExerciseByName from "./handlers/findStrengthExerciseByName.js";
import getExerciseSetsByName from "./handlers/getExerciseSetsByName.js";
import setExerciseSet from "./handlers/setExerciseSet.js";
import setStrengthExerciseData from "./handlers/setStrengthExerciseData.js";
import updateExerciseSetHandler from "./handlers/updateExerciseSet.js";
import deleteExerciseSetHandler from "./handlers/deleteExerciseSet.js";
import deleteStrengthExerciseHandler from "./handlers/deleteStrengthExercise.js";
import { groupSetByExercise } from "./mappers/strenghtMappers.js";

async function addStrengthExecise(req, res) {
    const exerciseData = {
        exerciseUser: req.body.exerciseUser,
        exerciseName: req.body.exerciseName,
        exerciseDate: req.body.exerciseDate,
        uuidCathegory: req.body.uuidCathegory || null,
        exerciseSet: req.body.set
    }
 
    try {
        let exerciseUuid = await findStrengthExerciseByName(
            exerciseData.exerciseDate,
            exerciseData.exerciseUser,
            exerciseData.exerciseName
        );

        if (!exerciseUuid) {
            exerciseUuid = await setStrengthExerciseData(exerciseData);
        }

        const setedExerciseSet = await setExerciseSet(exerciseUuid, exerciseData.exerciseSet);
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

async function getExerciseSets(req, res) {
    const { date, user, exerciseName } = req.params;

    try {
        const result = await getExerciseSetsByName(date, user, exerciseName);
        if (!result) {
            return res.sendStatus(404);
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function updateExerciseSet(req, res) {
    const { uuid } = req.params;
    const { weight, repeats } = req.body;

    try {
        const result = await updateExerciseSetHandler(uuid, weight, repeats);
        if (result === 'NOT_FOUND') {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function deleteExerciseSet(req, res) {
    const { uuid } = req.params;

    try {
        const result = await deleteExerciseSetHandler(uuid);
        if (result === 'NOT_FOUND') {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function deleteStrengthExercise(req, res) {
    const { uuid } = req.params;

    try {
        const result = await deleteStrengthExerciseHandler(uuid);
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
    addStrengthExecise,
    getStrengthExercises,
    getExerciseSets,
    updateExerciseSet,
    deleteExerciseSet,
    deleteStrengthExercise
}