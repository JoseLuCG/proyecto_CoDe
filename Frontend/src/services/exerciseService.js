import { exerciseMapper, exerciseTypeChecker } from "../adapters/exerciseAdapters";
import { apiRoutes, HOST_IP } from "../utilities/defineConfig";

// ---------- Cardio Exercises ----------
export async function addCardioExercise(newData) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.cardio.addExercise;
    const adaptedData = exerciseTypeChecker(newData);
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adaptedData) 
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    const data = await response.text();
    return data;
}

export async function getCardioExercisesInDate(date, user) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.cardio.getCardioExercisesInDate + date +"/" + user;
    const response = await fetch(apiEndPointDirection);
    const data = await response.json();
    const mappedData = exerciseMapper(data);
    
    return mappedData;
}

// ---------- Strength Exercises ----------
export async function addStrengthExecise(newData) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.addExercise;
    const adaptedData = exerciseTypeChecker(newData);
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adaptedData) 
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    const data = await response.json();
    return data;
}