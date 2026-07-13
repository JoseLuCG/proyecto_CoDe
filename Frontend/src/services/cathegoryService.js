import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";
import { isOnline } from "../utilities/networkState";
import { enqueue } from "../utilities/offlineQueue";
import * as local from "./local/localDataService";

export async function getCathegories(token, isGuest = false) {
    if (isGuest) return local.getCathegories();
    const apiEndPointDirection = HOST_IP + apiRoutes.cathegory.getCathegories;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener categorías");
    }
    const data = await response.json();
    return data;
}

export async function addCathegory(cathegoryName, token, isGuest = false) {
    if (isGuest) return local.addCathegory(cathegoryName);
    const apiEndPointDirection = HOST_IP + apiRoutes.cathegory.addCathegory;
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({ cathegoryName })
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "POST",
            endpoint: apiRoutes.cathegory.addCathegory,
            body: { cathegoryName },
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

export async function deleteCathegory(uuid, token, isGuest = false) {
    if (isGuest) return local.deleteCathegory(uuid);
    const apiEndPointDirection = HOST_IP + apiRoutes.cathegory.deleteCathegory + uuid;
    const fetchOptions = {
        method: "DELETE",
        headers: authHeaders(token)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "DELETE",
            endpoint: apiRoutes.cathegory.deleteCathegory + uuid,
            body: null,
            headers: authHeaders(token)
        });
        return { ok: true };
    }

    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        throw new Error("Error al eliminar categoría");
    }
    return response;
}
