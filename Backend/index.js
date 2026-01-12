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
// TODO: Add endpoint to update the user
// TODO: Add endpoint to recover the password
// TODO: Add endpoint to delete users

// * Cardio End-points
app.post(cardioRoutes.addCardioExercise, jsonParser, cardioControllers.addCardioExercise);
app.get(cardioRoutes.getCardioExercisesInDate, cardioControllers.getCardioExercises);
// TODO: Add endpoint to update the exercise
// TODO: Add endpoint to delete the exercise

// * Strength End-points
app.post(strenghtRoutes.addStrengthExercise, jsonParser, strengthControllers.addStrengthExecise);
app.get(strenghtRoutes.getStrengthExercisesInDate, strengthControllers.getStrengthExercises);
// TODO: Add endpoint to update the exercise
// TODO: Add endpoint to delete the exercise

app.use("/test", controllers.testPruebas);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
