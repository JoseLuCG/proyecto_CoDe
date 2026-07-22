import { apiRoutes, HOST_IP } from "../utilities/defineConfig";
import { authHeaders } from "../utilities/authFunctions";

export async function getMonthlyActivity(year, month, user, token) {
    const apiEndPointDirection = HOST_IP + apiRoutes.activity.getMonthlyActivity + year + "/" + month + "/" + user;
    const response = await fetch(apiEndPointDirection, { headers: authHeaders(token) });
    if (!response.ok) {
        throw new Error("Error al obtener actividad mensual");
    }
    const data = await response.json();
    return data.dates;
}
