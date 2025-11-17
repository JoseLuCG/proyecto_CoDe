import { mySqlConn } from "../../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

function addCardioExercise(req, res) {
    const { 
        exerciseDate, 
        idUser, 
        exerciseName, 
        intensity, 
        exerciseTime, 
        distance 
    } = req.body;
    const uuidCardioExercise = uuidV4();
    let sql = `
    ww
    `;

    console.log(req.body);
    
    /*
    mySqlConn.query(sql, function (err) {
        if (err) console.log(err);
        else res.send("Correcto");
    });
    */
}

export {
    addCardioExercise
}