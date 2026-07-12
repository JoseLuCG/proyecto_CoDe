import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";
import { isOnline } from "../utilities/networkState";
import { enqueue } from "../utilities/offlineQueue";

export async function addFood(newData, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.feeding.addFood;
    const fetchOptions = {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(newData)
    };

    if (!(await isOnline())) {
        await enqueue({
            method: "POST",
            endpoint: apiRoutes.feeding.addFood,
            body: newData,
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

export async function getFoodsInDate(date, user, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.feeding.getFoods + date + "/" + user;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener alimentos");
    }
    const data = await response.json();
    return data;
}