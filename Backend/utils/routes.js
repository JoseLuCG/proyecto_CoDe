export const userRoutes = {
    singUpNewUser: "/addUser",
    loginUser: "/checkLogin"
}

export const cardioRoutes = {
    addCardioExercise: "/record-cardio-exercise",
    getCardioExercisesInDate: "/cardio-exercises/:date/:user"
}

export const strenghtRoutes = {
    addStrengthExercise: "/record-strength-exercise",
    getStrengthExercisesInDate: "/strength-exercises/:date/:user"
}

export const feedingRoutes = {
    addFood: "/record-food",
    getFoods: "/user-feeding/:date/:user"
}

export const cathegoryRoutes = {
    addCathegory: "/add-cathegory",
    getCathegories: "/cathegories",
    deleteCathegory: "/delete-cathegory/:uuid"
}