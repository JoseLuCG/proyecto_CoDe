export function groupSetByExercise(exercises) {
    let grouped = [];
    for ( let ex of exercises ) {
        let id = ex.uuid_strength_exercise;
        
        if(!grouped[id]) {
            grouped[id] = {
                uuid_strength_exercise: id,
                exercise_name: ex.exercise_name,
                exercise_date: ex.exercise_date,
                sets: []
            };
        }

        grouped[id].sets.push({
            uuid_exercise_set: ex.uuid_exercise_set,
            set_number: ex.set_number,
            weight: ex.weight,
            repeats: ex.repeats
        });
    }
    //console.dir(grouped, { depth: null });

    return grouped;
}