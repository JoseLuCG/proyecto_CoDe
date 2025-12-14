import { mySqlConn } from "../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";
import setCardioExerciseData from "./handlers/setCardioExerciseData.js";

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
         if (promise == 'OK' ) {
            res.sendStatus(200);
            console.log("Exercise saved!");
            
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } 
}

async function getCardioExercises(req, res) {
    try {
        console.log(req.params);
                
    } catch (error) {
        
    }    
}

export {
    addCardioExercise,
    getCardioExercises
}