import express from "express";
import dotenv from "dotenv";
import * as userControllers from "./controllers/user-controllers.js"
import * as cardioControllers from "./controllers/exerciseControllers/cardioControllers.js"
import * as strengthControllers from "./controllers/exerciseControllers/strengthControllers.js"
import cors from "cors";
import { cardioRoutes, strenghtRoutes } from "./utils/routes.js";
import { authenticateToken } from "./middleware/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = express.json();

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["*"];

const corsOptions = {
  origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/addUser", jsonParser, userControllers.addNewUser);
app.post("/checkLogin", jsonParser, userControllers.checkLogin);

app.post(cardioRoutes.addCardioExercise, jsonParser, authenticateToken, cardioControllers.addCardioExercise);
app.get(cardioRoutes.getCardioExercisesInDate, authenticateToken, cardioControllers.getCardioExercises);

app.post(strenghtRoutes.addStrengthExercise, jsonParser, authenticateToken, strengthControllers.addStrengthExecise);
app.get(strenghtRoutes.getStrengthExercisesInDate, authenticateToken, strengthControllers.getStrengthExercises);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
