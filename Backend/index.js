import express from "express";
import * as controllers from "./controllers/controller.js";
import * as userControllers from "./controllers/user-controllers.js"
import * as cardioControllers from "./controllers/exerciseControllers/cardioControllers.js"
import * as strengthControllers from "./controllers/exerciseControllers/strengthControllers.js"
import cors from "cors";
import { cardioRoutes, strenghtRoutes } from "./utils/routes.js";

const app = express();
const port = 3000;
const jsonParser = express.json();

const corsOptions = {
  origin: '*',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// * User End-points:
app.post("/addUser", jsonParser, userControllers.addNewUser);
app.post("/checkLogin", jsonParser, userControllers.checkLogin); 

// * Cardio End-points
app.post(cardioRoutes.addCardioExercise, jsonParser, cardioControllers.addCardioExercise);
app.get(cardioRoutes.getCardioExercisesInDate, cardioControllers.getCardioExercises);

// * Strength End-points
app.post(strenghtRoutes.addStrengthExercise, jsonParser, strengthControllers.addStrengthExecise);


app.post("/removeUser", jsonParser, controllers.removeUser); 
app.post("/addStrengthExercise", jsonParser, controllers.addStrengthExercise); 
//app.post("/addCardioExercise", jsonParser, controllers.addCardioExercise); 
app.post("/addUserStrengthExercise", jsonParser, controllers.addUserStrengthExercise); 
//app.post("/addUserCardioExercise", jsonParser, controllers.addUserCardioExercise); 

app.post("/getUserCardio", jsonParser, controllers.getUserCardio);
app.post("/getUserFuerza", jsonParser, controllers.getUserFuerza);
app.post("/removeEjercicio", jsonParser, controllers.removeUserEjercicio); 
app.post("/getUser",jsonParser,controllers.getUser);

app.use("/test", controllers.testPruebas);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
