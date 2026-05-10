import { userFromBackToFront } from "../mappers/userMappers";
import { HOST_IP, apiRoutes } from "../utilities/defineConfig";

export async function loginUser(userData) {
    const apiEndPointDirection = HOST_IP + apiRoutes.user.singUp;
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    const response = await fetch(apiEndPointDirection, fetchOptions);
    const jsonData = await response.json();

    if (!response.ok) {
        throw new Error(jsonData.error || "Error al iniciar sesión");
    }

    const mappedUser = userFromBackToFront(jsonData.user);

    return {
        token: jsonData.token,
        user: mappedUser
    };
}
