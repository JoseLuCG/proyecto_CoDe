/**
     * Fetch Add a new Cardio Exercise to User on Backend/addUserCardioExercise
     * @param {String} tipo Cardio Type
     * @param {Date} fecha Cardio Date
     * @param {Number} intensidadOset Cardio Intensity
     * @param {Number} tiempoOpeso Cardio Time
     * @param {Number} distanciaOrepeticiones Cardio Distance
     */
export async function addCardio(id, tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseDate: fecha, idUser: id, exerciseName: tipo, intensity: intensidadOset, exerciseTime: tiempoOpeso, distance: distanciaOrepeticiones })
    };
    const response = await fetch("http://localhost:3000/addUserCardioExercise", requestOptions)
    const data = await response.text();
    return data;
}

/**
 * Fetch Add a new Strength Exercise to User on Backend/addUserStrengthExercise
 * @param {String} tipo Strength Type
 * @param {Date} fecha Strength Date
 * @param {Number} intensidadOset Strength Set
 * @param {Number} tiempoOpeso Strength Weight
 * @param {Number} distanciaOrepeticiones Strength Repetitions
 */
export async function addFuerza(id, tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseDate: fecha, idUser: id, exerciseName: tipo, setNumber: intensidadOset, weight: tiempoOpeso, repeats: distanciaOrepeticiones })
    };
    const response = await fetch("http://localhost:3000/addUserStrengthExercise", requestOptions);
    const data = await response.text();
    return data;
}

/**
 * Fetch Sends userId to remove from users on Backend/removeUser
 * @param {Number} id userId needed to remove user
 */
export async function removeUser(id) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: id })
    };
    const response = await fetch("http://localhost:3000/removeUser", requestOptions);
    const data = await response.text();
    return data;
}

/**
 * Fetch sends ExerciseDate, idUser and exerciseName to Delete exercise on Backend/removeUserExercise
 * @param {Date} exerciseDate the date of the exercise
 * @param {Number} idUser The Id of actual User
 * @param {String} exerciseName The name of the Exercise
 */
export async function removeExercise(id, exerciseDate, exerciseName) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: id, exerciseName: exerciseName, exerciseDate: exerciseDate })
    };
    const response = await fetch("http://localhost:3000/removeEjercicio", requestOptions);
    const data = await response.text();
    return data;
}

/**
* Fetch Sends userID to Backend/getUserCardio and gets Cardio Exercises to update state
* @param {Number} id ID of logged User
* @returns {Array} Array of User Cardio Objects
*/
export async function getEjerciciosCardio(id) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: id })
    };
    const response = await fetch("http://localhost:3000/getUserCardio", requestOptions);
    const data = await response.json();
    return data;
}

/**
 * Fetch Sends userID to Backend/getUserStrength and gets Strength Exercises to update state
 * @param {Number} id ID of logged user
 * @returns {Array} Array of User Strength Objects
 */
export async function getEjerciciosFuerza(id) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: id })
    };
    const response = await fetch("http://localhost:3000/getUserFuerza", requestOptions);
    const data = await response.json();
    return data;
}

//  Cuando recibe el Login ID, recoge los Datos del Usuario, luego los Cardio y Strength Exercises
/**
 * Fetch Sends Phone and Password to Backend/userLogin and get Login ID to update user Status
 *  @param {String} passwdIn Password to Attempt to Log In
 * @param {String} phoneIn Phone to Attempt to
 * @returns {Array} Array of 1 or 0 users (only 1, on position 0) 
 */
export async function Login(passwdIn, phoneIn) {

    const response = await fetch("http://localhost:3000/checkLogin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passwd: passwdIn, phoneNumber: phoneIn })
    })
    const data = await response.json();
    return data;
}

//  Cuando recibe el Login ID, recoge los Datos del Usuario, luego los Cardio y Strength Exercises
/**
 * Fetch Sends Phone and Password to Backend/userLogin and get Login ID to update user Status
 *  @param {String} passwdIn Password to Attempt to Log In
 * @param {String} phoneIn Phone to Attempt to
 * @returns {Array} Array of 1 or 0 users (only 1, on position 0) 
 */
export async function loginNuevo(passwdIn, phoneIn) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passwd: passwdIn, phoneNumber: phoneIn })
    };
    const response = await fetch("http://localhost:3000/getUser", requestOptions);
    const data = await response.json();
    return data;
}
