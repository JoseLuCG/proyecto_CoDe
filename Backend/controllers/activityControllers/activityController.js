import getMonthlyActivity from "./handlers/getMonthlyActivity.js";

async function getMonthlyActivityData(req, res) {
    const { year, month, user } = req.params;

    try {
        const dates = await getMonthlyActivity(year, month, user);
        res.json({ dates });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export { getMonthlyActivityData };
