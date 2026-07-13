import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";
import * as local from "./local/localDataService";

export async function getPresets(type, cathegory, user, token, isGuest = false) {
    if (isGuest) return local.getPresets(type, cathegory);
    let apiEndPointDirection = HOST_IP + apiRoutes.exercisePresets + "?type=" + type;
    if (cathegory) {
        apiEndPointDirection += "&cathegory=" + cathegory;
    }
    if (user) {
        apiEndPointDirection += "&user=" + user;
    }
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener presets");
    }
    const data = await response.json();
    return data;
}
