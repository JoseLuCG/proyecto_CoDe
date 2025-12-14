const HOST_IP = "http://192.168.1.134:3000";
const apiRoutes = {
    user: {
        addUser : "/addUser",
    },
    exercise: {
        cardio: {
            addExercise: "/record-cardio-exercise",
            getCardioExercisesInDate: "/cardio-exercises/"
        }
    }

}

export {
    HOST_IP,
    apiRoutes
}