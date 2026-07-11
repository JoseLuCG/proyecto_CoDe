import getExercisePresets from "./handlers/getExercisePresets.js";

async function getPresets(req, res) {
    const { type, cathegory, user } = req.query;

    if (!type) {
        res.status(400).json({ error: "Exercise type is required" });
        return;
    }

    try {
        const presets = await getExercisePresets(type, cathegory || null, user || null);
        res.json(presets);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export { getPresets };
