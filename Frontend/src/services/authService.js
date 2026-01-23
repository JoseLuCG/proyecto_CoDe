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
    const data = userFromBackToFront(jsonData);
    
    return data;
};