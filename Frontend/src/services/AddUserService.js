import { apiRoutes, HOST_IP } from "../utilities/defineConfig";

const apiEndPointDirection = HOST_IP + apiRoutes.user.addUser;

export async function addUser(newUser) {
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    };
    const response = await fetch(apiEndPointDirection, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
    }

    return data;
}
