import { Platform } from "react-native";

const HOST_IP = "http://192.168.1.135:3000";
const apiRoutes = {
    user: {
        addUser : "/addUser",
        singUp: "/checkLogin"
    },
    exercise: {
        cardio: {
            addExercise: "/record-cardio-exercise",
            getCardioExercisesInDate: "/cardio-exercises/",
            updateCardioExercise: "/update-cardio-exercise/",
            deleteCardioExercise: "/delete-cardio-exercise/"
        },
        strength: {
            addExercise: "/record-strength-exercise",
            getStrengthExercisesInDate: "/strength-exercises/",
            getExerciseSets: "/strength-exercise-sets/",
            updateExerciseSet: "/update-exercise-set/",
            deleteExerciseSet: "/delete-exercise-set/",
            deleteStrengthExercise: "/delete-strength-exercise/"
        }
    },
    feeding: {
        addFood: "/record-food",
        getFoods: "/user-feeding/"
    },
    cathegory: {
        addCathegory: "/add-cathegory",
        getCathegories: "/cathegories",
        deleteCathegory: "/delete-cathegory/"
    },
    exercisePresets: "/exercise-presets"
}

const runnigInBrowser = Platform.OS === "web";

export {
    HOST_IP,
    apiRoutes,
    runnigInBrowser
}