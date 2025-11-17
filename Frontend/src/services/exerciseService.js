export async function addCardioExercise(newData) {
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData) 
    };
    // const response = await fetch("http://192.168.1.132:3000/addUser", fetchOptions);
    const response = await fetch("http://192.168.1.130:3000/record-cardio-exercise", fetchOptions);
    const data = await response.text();
    return data;
}