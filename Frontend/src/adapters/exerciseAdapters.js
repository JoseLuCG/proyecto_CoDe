export function cardioAdapter(data) {
        return{
            exerciseUser: data.exerciseUser? data.exerciseUser : "Empty",
            exerciseName: data.exerciseName,
            exerciseDate: data.exerciseDate,
            exerciseTime: `${data.exerciseTime.hours}:${data.exerciseTime.minutes}:${data.exerciseTime.seconds}`,
            exerciseDistance: data.exerciseDistance,
            exerciseIntensity: data.exerciseIntensity
        }
}

export function exerciseMapper(data) {
    const dataMapped = [];

    data.map(
        (exercise) => {
            let exerciseMapped = {
                uuidUser: exercise.uuid_user,
                uuidExercise: exercise.uuid_cardio_exercise,
                date: exercise.exercise_date,
                name: exercise.exercise_name,
                time: exercise.exercise_time,
                distance: exercise.distance,
                intensity: exercise.intensity
            }
            
            dataMapped.push(exerciseMapped);
        }
    );
    return dataMapped;
}

export function exerciseStrengthMapper(data){
    const dataMapped = [];
     data.map(
        (exercise) => {
            let exerciseMapped = {
                uuidExercise: exercise.uuid_strength_exercise,
                date: exercise.exercise_date,
                name: exercise.exercise_name,
                sets: exercise.sets
            }
            
            dataMapped.push(exerciseMapped);
        }
    );
    return dataMapped;
}