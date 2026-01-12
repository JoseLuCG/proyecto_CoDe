export function exerciseTypeChecker(data) {
    if (!data.exerciseType) {
        return{
            exerciseUser: data.exerciseUser? data.exerciseUser : "Empty",
            exerciseName: data.exerciseName,
            exerciseDate: data.exerciseDate,
            exerciseTime: data.exerciseTime,
            exerciseDistance: data.exerciseDistance,
            exerciseIntensity: data.exerciseIntensity
        }
    } else {
        return {
            exerciseUser: data.exerciseUser? data.exerciseUser : "Empty",
            exerciseName: data.exerciseName,
            exerciseDate: data.exerciseDate,
            exerciseSetNumber: data.exerciseSetNumber,
            exerciseWeight: data.exerciseWeight,
            exerciseRepeats: data.exerciseRepeats
        }
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
                uuidUser: exercise.uuid_user,
                uuidExercise: exercise.uuid_cardio_exercise,
                date: exercise.exercise_date,
                name: exercise.exercise_name,
                weight: exercise.weight,
                repeats: exercise.repeats,
                setNumber: exercise.set_number
            }
            
            dataMapped.push(exerciseMapped);
        }
    );
    return dataMapped;
}