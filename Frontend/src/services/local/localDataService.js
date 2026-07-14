import Storage from "../../utilities/storagePersistence";

const KEYS = {
    cardio: "guest_cardio_exercises",
    strength: "guest_strength_exercises",
    sets: "guest_exercise_sets",
    food: "guest_food_intakes",
    categories: "guest_categories",
};

const DEFAULT_CATEGORIES = [
    { uuid_cathegory: "cat-piernas", cathegory_name: "Piernas" },
    { uuid_cathegory: "cat-pecho", cathegory_name: "Pecho" },
    { uuid_cathegory: "cat-espalda", cathegory_name: "Espalda" },
    { uuid_cathegory: "cat-hombros", cathegory_name: "Hombros" },
    { uuid_cathegory: "cat-brazos", cathegory_name: "Brazos" },
    { uuid_cathegory: "cat-abdomen", cathegory_name: "Abdomen" },
    { uuid_cathegory: "cat-cardio", cathegory_name: "Cardio" },
];

const DEFAULT_PRESETS = [
    { uuid_exercise_preset: "pre-1", exercise_name: "Press de banca", exercise_type: "strength", uuid_cathegory: "cat-pecho" },
    { uuid_exercise_preset: "pre-2", exercise_name: "Sentadilla", exercise_type: "strength", uuid_cathegory: "cat-piernas" },
    { uuid_exercise_preset: "pre-3", exercise_name: "Peso muerto", exercise_type: "strength", uuid_cathegory: "cat-espalda" },
    { uuid_exercise_preset: "pre-4", exercise_name: "Press militar", exercise_type: "strength", uuid_cathegory: "cat-hombros" },
    { uuid_exercise_preset: "pre-5", exercise_name: "Curl de bíceps", exercise_type: "strength", uuid_cathegory: "cat-brazos" },
    { uuid_exercise_preset: "pre-6", exercise_name: "Plancha abdominal", exercise_type: "strength", uuid_cathegory: "cat-abdomen" },
    { uuid_exercise_preset: "pre-7", exercise_name: "Carrera", exercise_type: "cardio", uuid_cathegory: "cat-cardio" },
    { uuid_exercise_preset: "pre-8", exercise_name: "Bicicleta", exercise_type: "cardio", uuid_cathegory: "cat-cardio" },
];

function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function normalizeDate(dateStr) {
    if (!dateStr) return dateStr;
    const parts = dateStr.split("-");
    if (parts.length === 3 && parts[0].length === 2) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
}

async function getCollection(key) {
    const raw = await Storage.getItem(key);
    return raw ? JSON.parse(raw) : [];
}

async function saveCollection(key, data) {
    await Storage.setItem(key, JSON.stringify(data));
}

// ── Cardio ──

export async function addCardioExercise(newData) {
    const exercises = await getCollection(KEYS.cardio);
    const adapted = {
        uuid_cardio_exercise: generateUUID(),
        uuid_user: "guest-local",
        exercise_name: newData.exerciseName,
        exercise_date: normalizeDate(newData.exerciseDate),
        exercise_time: `${newData.exerciseTime?.hours || "00"}:${newData.exerciseTime?.minutes || "00"}:${newData.exerciseTime?.seconds || "00"}`,
        distance: newData.exerciseDistance || "0",
        intensity: newData.exerciseIntensity || "0",
    };
    exercises.push(adapted);
    await saveCollection(KEYS.cardio, exercises);
    return "saved";
}

export async function getCardioExercisesInDate(date) {
    const exercises = await getCollection(KEYS.cardio);
    const filtered = exercises.filter((e) => e.exercise_date === date);
    return filtered.map((e) => ({
        uuidUser: e.uuid_user,
        uuidExercise: e.uuid_cardio_exercise,
        date: e.exercise_date,
        name: e.exercise_name,
        time: e.exercise_time,
        distance: e.distance,
        intensity: e.intensity,
    }));
}

// ── Strength ──

export async function addStrengthExercise(newData) {
    const exercises = await getCollection(KEYS.strength);
    const sets = await getCollection(KEYS.sets);

    let exercise = exercises.find(
        (e) => e.exercise_name === newData.exerciseName
            && e.exercise_date === normalizeDate(newData.exerciseDate)
            && e.uuid_user === "guest-local"
    );

    if (!exercise) {
        exercise = {
            uuid_strength_exercise: generateUUID(),
            uuid_user: "guest-local",
            exercise_name: newData.exerciseName,
            exercise_date: normalizeDate(newData.exerciseDate),
            uuid_cathegory: newData.uuidCathegory || null,
        };
        exercises.push(exercise);
    }

    if (newData.set && newData.set.setWeight) {
        sets.push({
            uuid_exercise_set: generateUUID(),
            uuid_strength_exercise: exercise.uuid_strength_exercise,
            set_number: newData.set.setNumber || 1,
            weight: parseFloat(newData.set.setWeight) || 0,
            repeats: parseInt(newData.set.setRepeats, 10) || 0,
        });
    }

    await saveCollection(KEYS.strength, exercises);
    await saveCollection(KEYS.sets, sets);
    return { ok: true };
}

export async function getStrengthExercisesInDate(date) {
    const exercises = await getCollection(KEYS.strength);
    const categories = await getCollection(KEYS.categories);
    const allSets = await getCollection(KEYS.sets);
    const filtered = exercises.filter((e) => e.exercise_date === date);
    return filtered.map((e) => {
        const cat = categories.find((c) => c.uuid_cathegory === e.uuid_cathegory);
        const exerciseSets = allSets
            .filter((s) => s.uuid_strength_exercise === e.uuid_strength_exercise)
            .map((s) => ({
                uuid_exercise_set: s.uuid_exercise_set,
                set_number: s.set_number,
                weight: s.weight,
                repeats: s.repeats,
            }));
        return {
            uuidExercise: e.uuid_strength_exercise,
            date: e.exercise_date,
            name: e.exercise_name,
            sets: exerciseSets,
            uuidCathegory: e.uuid_cathegory,
            cathegory_name: cat ? cat.cathegory_name : null,
        };
    });
}

export async function getExerciseSetsByName(date, exerciseName) {
    const exercises = await getCollection(KEYS.strength);
    const sets = await getCollection(KEYS.sets);
    const exercise = exercises.find(
        (e) => e.exercise_date === normalizeDate(date) && e.exercise_name === exerciseName
    );
    if (!exercise) return null;
    const filtered = sets
        .filter((s) => s.uuid_strength_exercise === exercise.uuid_strength_exercise)
        .map((s) => ({
            uuid_exercise_set: s.uuid_exercise_set,
            set_number: s.set_number,
            weight: s.weight,
            repeats: s.repeats,
        }));
    return {
        uuid_strength_exercise: exercise.uuid_strength_exercise,
        sets: filtered,
    };
}

export async function updateExerciseSet(uuid, setData) {
    const sets = await getCollection(KEYS.sets);
    const idx = sets.findIndex((s) => s.uuid_exercise_set === uuid);
    if (idx !== -1) {
        sets[idx] = { ...sets[idx], ...setData };
        await saveCollection(KEYS.sets, sets);
    }
    return { ok: true };
}

export async function deleteExerciseSet(uuid) {
    const sets = await getCollection(KEYS.sets);
    const filtered = sets.filter((s) => s.uuid_exercise_set !== uuid);
    await saveCollection(KEYS.sets, filtered);
    return { ok: true };
}

export async function deleteExercise(uuidExercise) {
    const exercises = await getCollection(KEYS.strength);
    const sets = await getCollection(KEYS.sets);
    const filteredExercises = exercises.filter((e) => e.uuid_strength_exercise !== uuidExercise);
    const filteredSets = sets.filter((s) => s.uuid_strength_exercise !== uuidExercise);
    await saveCollection(KEYS.strength, filteredExercises);
    await saveCollection(KEYS.sets, filteredSets);
    return { ok: true };
}

// ── Food ──

export async function addFood(newData) {
    const foods = await getCollection(KEYS.food);
    foods.push({
        uuid_food_intake: generateUUID(),
        uuid_user: "guest-local",
        food_name: newData.foodName,
        intake_date: normalizeDate(newData.intakeDate),
        kcal: newData.kcal || 0,
        proteins: newData.proteins || 0,
        carbohydrates: newData.carbohydrates || 0,
        fat: newData.fat || 0,
    });
    await saveCollection(KEYS.food, foods);
    return "saved";
}

export async function getFoodsInDate(date) {
    const foods = await getCollection(KEYS.food);
    return foods.filter((f) => f.intake_date === date);
}

// ── Categories ──

export async function getCathegories() {
    let categories = await getCollection(KEYS.categories);
    if (categories.length === 0) {
        categories = [...DEFAULT_CATEGORIES];
        await saveCollection(KEYS.categories, categories);
    }
    return categories;
}

export async function addCathegory(cathegoryName) {
    const categories = await getCollection(KEYS.categories);
    const newCat = {
        uuid_cathegory: generateUUID(),
        cathegory_name: cathegoryName,
    };
    categories.push(newCat);
    await saveCollection(KEYS.categories, categories);
    return { ok: true };
}

export async function deleteCathegory(uuid) {
    const categories = await getCollection(KEYS.categories);
    const filtered = categories.filter((c) => c.uuid_cathegory !== uuid);
    await saveCollection(KEYS.categories, filtered);
    return { ok: true };
}

// ── Presets (read-only defaults) ──

export async function getPresets(type, cathegory) {
    let presets = [...DEFAULT_PRESETS];
    if (type) {
        presets = presets.filter((p) => p.exercise_type === type);
    }
    if (cathegory) {
        presets = presets.filter((p) => p.uuid_cathegory === cathegory);
    }
    return presets;
}
