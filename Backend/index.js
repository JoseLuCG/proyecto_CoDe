import express from "express";
import * as controllers from "./controllers/controller.js";

const app = express();
const port = 3000;
const jsonParser = express.json();

app.post("/addUser", jsonParser, controllers.addUser); //Proved. WORKS
app.delete("/removeUser", jsonParser, controllers.removeUser); //Proved. WORKS
app.post("/checkLogin", jsonParser, controllers.checkLogin); // Proved. WORKS
app.post("/addStrengthExercise", jsonParser, controllers.addStrengthExercise); // Proved. WORKS
app.post("/addCardioExercise", jsonParser, controllers.addCardioExercise); // Proved. WORKS
app.post("/addUserStrengthExercise", jsonParser, controllers.addUserStrengthExercise); 


app.get("/addUserEjercicio", controllers.addUserEjercicio);
app.get("/getUserCardio", controllers.getUserCardio);
app.get("/getUserFuerza", controllers.getUserFuerza);
app.delete("/removeEjercicio", controllers.removeUserEjercicio);

app.use("/test", controllers.testPruebas);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
