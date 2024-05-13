import express from "express";
import * as controllers from "./controllers/controller.js";
import cors from "cors";

const app = express();
const port = 3000;
const jsonParser = express.json();

const corsOptions = {
  origin: '*',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/addUser", jsonParser, controllers.addUser); //Proved. WORKS
app.post("/removeUser", jsonParser, controllers.removeUser); //Proved. WORKS
app.post("/checkLogin", jsonParser, controllers.checkLogin); // Proved. WORKS
app.post("/addStrengthExercise", jsonParser, controllers.addStrengthExercise); // Proved. WORKS
app.post("/addCardioExercise", jsonParser, controllers.addCardioExercise); // Proved. WORKS
app.post("/addUserStrengthExercise", jsonParser, controllers.addUserStrengthExercise); // Proved. WORKS
app.post("/addUserCardioExercise", jsonParser, controllers.addUserCardioExercise); // Proved. WORKS

app.post("/getUserCardio", jsonParser, controllers.getUserCardio);
app.post("/getUserFuerza", jsonParser, controllers.getUserFuerza);
app.post("/removeEjercicio", jsonParser, controllers.removeUserEjercicio); // Proved. WORKS

app.use("/test", controllers.testPruebas);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
