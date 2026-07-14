import { cardioAdapter, exerciseMapper, exerciseStrengthMapper } from "../adapters/exerciseAdapters";
import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";
import { isOnline } from "../utilities/networkState";
import { enqueue } from "../utilities/offlineQueue";
import * as local from "./local/localDataService";

export async function addCardioExercise(newData, token, isGuest = false) {
    if (isGuest) return local.addCardioExercise(newData);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.cardio.addExercise;
    const adaptedData = cardioAdapter(newData);
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(adaptedData)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "POST",
            endpoint: apiRoutes.exercise.cardio.addExercise,
            body: adaptedData,
            headers: authHeaders(token)
        });
        return "queued";
    }

    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    const data = await response.text();
    return data;
}

export async function getCardioExercisesInDate(date, user, token, isGuest = false) {
    if (isGuest) return local.getCardioExercisesInDate(date);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.cardio.getCardioExercisesInDate + date + "/" + user;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener ejercicios cardiovasculares");
    }
    const data = await response.json();
    const mappedData = exerciseMapper(data);
    return mappedData;
}

export async function addStrengthExecise(newData, token, isGuest = false) {
    if (isGuest) return local.addStrengthExercise(newData);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.addExercise;
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(newData)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "POST",
            endpoint: apiRoutes.exercise.strength.addExercise,
            body: newData,
            headers: authHeaders(token)
        });
        return { ok: true };
    }

    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}

export async function getStrengthExercisesInDate(date, user, token, isGuest = false) {
    if (isGuest) return local.getStrengthExercisesInDate(date);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.getStrengthExercisesInDate + date + "/" + user;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener ejercicios de fuerza");
    }
    const data = await response.json();
    const mappedData = exerciseStrengthMapper(data);
    return mappedData;
}

export async function getExerciseSetsByName(date, user, exerciseName, token, isGuest = false) {
    if (isGuest) return local.getExerciseSetsByName(date, exerciseName);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.getExerciseSets + date + "/" + user + "/" + encodeURIComponent(exerciseName);
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export async function updateExerciseSet(uuid, setData, token, isGuest = false) {
    if (isGuest) return local.updateExerciseSet(uuid, setData);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.updateExerciseSet + uuid;
    const fetchOptions = {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(setData)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "PUT",
            endpoint: apiRoutes.exercise.strength.updateExerciseSet + uuid,
            body: setData,
            headers: authHeaders(token)
        });
        return { ok: true };
    }

    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}

export async function deleteExerciseSet(uuid, token, isGuest = false) {
    if (isGuest) return local.deleteExerciseSet(uuid);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.deleteExerciseSet + uuid;
    const fetchOptions = {
        method: "DELETE",
        headers: authHeaders(token)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "DELETE",
            endpoint: apiRoutes.exercise.strength.deleteExerciseSet + uuid,
            body: null,
            headers: authHeaders(token)
        });
        return { ok: true };
    }

    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}

export async function deleteStrengthExercise(uuid, token, isGuest = false) {
    if (isGuest) return local.deleteExercise(uuid);
    const apiEndPointDirection = HOST_IP + apiRoutes.exercise.strength.deleteStrengthExercise + uuid;
    const fetchOptions = {
        method: "DELETE",
        headers: authHeaders(token)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "DELETE",
            endpoint: apiRoutes.exercise.strength.deleteStrengthExercise + uuid,
            body: null,
            headers: authHeaders(token)
        });
        return { ok: true };
    }

    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}
