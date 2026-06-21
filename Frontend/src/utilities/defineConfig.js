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
            getCardioExercisesInDate: "/cardio-exercises/"
        },
        strength: {
            addExercise: "/record-strength-exercise",
            getStrengthExercisesInDate: "/strength-exercises/"
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
    }
}

const runnigInBrowser = Platform.OS === "web";

export {
    HOST_IP,
    apiRoutes,
    runnigInBrowser
}