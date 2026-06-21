import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";

export async function getCathegories(token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.cathegory.getCathegories;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener categorías");
    }
    const data = await response.json();
    return data;
}

export async function addCathegory(cathegoryName, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.cathegory.addCathegory;
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({ cathegoryName })
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        const errorData = await response.text().catch(() => "Error en la solicitud");
        throw new Error(errorData);
    }
    return response;
}

export async function deleteCathegory(uuid, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.cathegory.deleteCathegory + uuid;
    const fetchOptions = {
        method: "DELETE",
        headers: authHeaders(token)
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    if (!response.ok) {
        throw new Error("Error al eliminar categoría");
    }
    return response;
}
