import { userFromBackToFront } from "../mappers/userMappers";

export async function loginUser(userData) {
	const fetchOptions = {
		method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };
	const response = await fetch("http://192.168.1.132:3000/checkLogin", fetchOptions);
    console.log(userData);
    
    const jsonData = await response.json();
    const data = userFromBackToFront(jsonData);
    
    return data;
};

// 192.168.1.132/24 - Android.

// http://127.0.0.1:3000 - Localhost.