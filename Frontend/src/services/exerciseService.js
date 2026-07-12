import { cardioAdapter, exerciseMapper, exerciseStrengthMapper } from "../adapters/exerciseAdapters";
import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";

export async function addCardioExercise(newData, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.cardio.addExercise;
    const adaptedData = cardioAdapter(newData);
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(adaptedData)
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    const data = await response.text();
    return data;
}

export async function getCardioExercisesInDate(date, user, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.cardio.getCardioExercisesInDate + date + "/" + user;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener ejercicios cardiovasculares");
    }
    const data = await response.json();
    const mappedData = exerciseMapper(data);
    return mappedData;
}

export async function addStrengthExecise(newData, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.addExercise;
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(newData)
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}

export async function getStrengthExercisesInDate(date, user, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.getStrengthExercisesInDate + date + "/" + user;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener ejercicios de fuerza");
    }
    const data = await response.json();
    const mappedData = exerciseStrengthMapper(data);
    return mappedData;
}

export async function getExerciseSetsByName(date, user, exerciseName, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.getExerciseSets + date + "/" + user + "/" + encodeURIComponent(exerciseName);
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export async function updateExerciseSet(uuid, setData, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.updateExerciseSet + uuid;
    const fetchOptions = {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(setData)
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}

export async function deleteExerciseSet(uuid, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.deleteExerciseSet + uuid;
    const fetchOptions = {
        method: "DELETE",
        headers: authHeaders(token)
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}
