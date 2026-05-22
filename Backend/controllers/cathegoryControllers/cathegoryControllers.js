import getCathegories from "./handlers/getCathegoryData.js";
import setCathegoryData from "./handlers/setCathegoryData.js";
import deleteCathegoryData from "./handlers/deleteCathegoryData.js";

async function addCathegory(req, res) {
    const cathegoryName = req.body.cathegoryName;

    try {
        const result = await setCathegoryData(cathegoryName);
        if (result == 'OK') {
            res.sendStatus(200);
            console.log("Cathegory saved!");
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getCathegoriesList(req, res) {
    try {
        const cathegories = await getCathegories();
        res.json(cathegories);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function deleteCathegory(req, res) {
    const { uuid } = req.params;

    try {
        const result = await deleteCathegoryData(uuid);
        if (result == 'OK') {
            res.sendStatus(200);
            console.log("Cathegory deleted!");
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export {
    addCathegory,
    getCathegoriesList,
    deleteCathegory
}
