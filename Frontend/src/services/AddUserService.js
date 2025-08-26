/**
 * Fetch Register a new User on Backend/createUser
 * @param {String} nombre Name to create User
 * @param {String} apellidos Surname to create User
 * @param {String} passwd Password to create User
 * @param {String} phone Unique Phone to create User (Primary Key)
 */
export async function addUser(newUser) {
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    };
    const response = await fetch("http://127.0.0.1:3000/addUser", fetchOptions);
    const data = await response.text();
    return data;
}