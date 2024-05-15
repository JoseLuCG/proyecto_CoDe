/**
     * Fetch Add a new Cardio Exercise to User on Backend/addUserCardioExercise
     * @param {*} tipo Cardio Type
     * @param {*} fecha Cardio Date
     * @param {*} intensidadOset Cardio Intensity
     * @param {*} tiempoOpeso Cardio Time
     * @param {*} distanciaOrepeticiones Cardio Distance
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
     * @param {*} tipo Strength Type
     * @param {*} fecha Strength Date
     * @param {*} intensidadOset Strength Set
     * @param {*} tiempoOpeso Strength Weight
     * @param {*} distanciaOrepeticiones Strength Repetitions
     * @method addStrength
     */
    export async function addFuerza(id, tipo, fecha, intensidadOset, tiempoOpeso, distanciaOrepeticiones) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exerciseDate: fecha, idUser: id, exerciseName: tipo, setNumber: intensidadOset, weight: tiempoOpeso, repeats: distanciaOrepeticiones })
        };
        const response=await fetch("http://localhost:3000/addUserStrengthExercise", requestOptions);
        const data = await response.text();
        return data;
    }

    /**
     * Fetch Sends userId to remove from users on Backend/removeUser
     * @param {*} id userId needed to remove user
     */
    export async function removeUser(id) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id })
        };
        const response=await fetch("http://localhost:3000/removeUser", requestOptions);
        const data=await response.text();
        return data;
    }

    /**
     * Fetch sends ExerciseDate, idUser and exerciseName to Delete exercise on Backend/removeUserExercise
     * @param {*} exerciseDate the date of the exercise
     * @param {*} idUser The Id of actual User
     * @param {*} exerciseName The name of the Exercise
     */
    export async function removeExercise(id, exerciseDate, exerciseName) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id, exerciseName: exerciseName, exerciseDate: exerciseDate })
        };
        const response = await fetch("http://localhost:3000/removeEjercicio", requestOptions);
        const data=await response.text();
        return data;
    }

     /**
     * Fetch Sends userID to Backend/getUserCardio and gets Cardio Exercises to update state
     * @param {*} id ID of logged User
     */
     export async function getEjerciciosCardio(id) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id })
        };
        const response=await fetch("http://localhost:3000/getUserCardio", requestOptions);
        const data=await response.json();
        return data;
    }

    /**
     * Fetch Sends userID to Backend/getUserStrength and gets Strength Exercises to update state
     * @param {*} id 
     */
    export async function getEjerciciosFuerza(id) {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id })
        };
        const response =await fetch("http://localhost:3000/getUserFuerza", requestOptions);
        const data=await response.json();
        return data;
    }
    
    //  Cuando recibe el Login ID, recoge los Datos del Usuario, luego los Cardio y Strength Exercises
    /**
     * Fetch Sends Phone and Password to Backend/userLogin and get Login ID to update user Status
     *  @param {*} passwdIn Password to Attempt to Log In
     * @param {*} phoneIn Phone to Attempt to 
     */
    export async function Login(passwdIn, phoneIn) {

        const response = await fetch("http://localhost:3000/checkLogin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passwd: passwdIn, phoneNumber: phoneIn })
        })
        const data=await response.json();
        return data;
    }

    /**
     * Fetch Register a new User on Backend/createUser
     * @param {*} nombre Name to create User
     * @param {*} apellidos Surname to create User
     * @param {*} passwd Password to create User
     * @param {*} phone Unique Phone to create User (Primary Key)
     */
    export async function addUser(nombre, apellidos, passwd, phone) {
        console.log(nombre);
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nameUser: nombre, lastNameUser: apellidos, passwd: passwd, phoneNumber: phone })
        };
        const response= await fetch("http://127.0.0.1:3000/addUser", requestOptions)
        const data=await response.text();
        return data;
    }

