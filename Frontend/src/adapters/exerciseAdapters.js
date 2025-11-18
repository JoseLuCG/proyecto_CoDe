export function exerciseTypeChecker(data) {
    if (!data.exerciseType) {
        return{
            exerciseUser: "Empty",
            exerciseName: data.exerciseName,
            exerciseDate: data.exerciseDate,
            exerciseTime: data.exerciseTime,
            exerciseDistance: data.exerciseDistance,
            exerciseIntensity: data.exerciseIntensity
        }
    } else {
        return {
            exerciseUser: "Empty",
            exerciseName: data.exerciseName,
            exerciseDate: data.exerciseDate,
            exerciseSetNumber: data.exerciseSetNumber,
            exerciseWeight: data.exerciseWeight,
            exerciseRepeats: data.exerciseRepeats
        }
    }
}