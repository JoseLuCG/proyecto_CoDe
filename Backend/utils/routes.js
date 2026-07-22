export const userRoutes = {
    singUpNewUser: "/addUser",
    loginUser: "/checkLogin"
}

export const cardioRoutes = {
    addCardioExercise: "/record-cardio-exercise",
    getCardioExercisesInDate: "/cardio-exercises/:date/:user",
    updateCardioExercise: "/update-cardio-exercise/:uuid",
    deleteCardioExercise: "/delete-cardio-exercise/:uuid"
}

export const strenghtRoutes = {
    addStrengthExercise: "/record-strength-exercise",
    getStrengthExercisesInDate: "/strength-exercises/:date/:user",
    getExerciseSets: "/strength-exercise-sets/:date/:user/:exerciseName",
    updateExerciseSet: "/update-exercise-set/:uuid",
    deleteExerciseSet: "/delete-exercise-set/:uuid",
    deleteStrengthExercise: "/delete-strength-exercise/:uuid"
}

export const feedingRoutes = {
    addFood: "/record-food",
    getFoods: "/user-feeding/:date/:user",
    updateFood: "/update-food/:uuid",
    deleteFood: "/delete-food/:uuid"
}

export const cathegoryRoutes = {
    addCathegory: "/add-cathegory",
    getCathegories: "/cathegories",
    deleteCathegory: "/delete-cathegory/:uuid"
}

export const presetRoutes = {
    getExercisePresets: "/exercise-presets"
}

export const activityRoutes = {
    getMonthlyActivity: "/monthly-activity/:year/:month/:user"
}