import express from "express";
import dotenv from "dotenv";
import * as userControllers from "./controllers/user-controllers.js"
import * as cardioControllers from "./controllers/exerciseControllers/cardioControllers.js"
import * as strengthControllers from "./controllers/exerciseControllers/strengthControllers.js"
import * as feedingControllers from "./controllers/feedingControllers/feedingControllers.js";
import * as cathegoryControllers from "./controllers/cathegoryControllers/cathegoryControllers.js";
import * as presetsControllers from "./controllers/exerciseControllers/presetsControllers.js";
import cors from "cors";
import { cardioRoutes, strenghtRoutes, userRoutes, feedingRoutes, cathegoryRoutes, presetRoutes } from "./utils/routes.js";
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

// ---------- User Endpoints ----------
app.post(userRoutes.singUpNewUser, jsonParser, userControllers.addNewUser);
app.post(userRoutes.loginUser, jsonParser, userControllers.checkLogin);

// ---------- Cardio Endpoints ----------
app.post(cardioRoutes.addCardioExercise, jsonParser, authenticateToken, cardioControllers.addCardioExercise);
app.get(cardioRoutes.getCardioExercisesInDate, authenticateToken, cardioControllers.getCardioExercises);
app.put(cardioRoutes.updateCardioExercise, jsonParser, authenticateToken, cardioControllers.updateCardioExercise);
app.delete(cardioRoutes.deleteCardioExercise, authenticateToken, cardioControllers.deleteCardioExercise);

// ---------- Strenght Endpoints ----------
app.post(strenghtRoutes.addStrengthExercise, jsonParser, authenticateToken, strengthControllers.addStrengthExecise);
app.get(strenghtRoutes.getStrengthExercisesInDate, authenticateToken, strengthControllers.getStrengthExercises);
app.get(strenghtRoutes.getExerciseSets, authenticateToken, strengthControllers.getExerciseSets);
app.put(strenghtRoutes.updateExerciseSet, jsonParser, authenticateToken, strengthControllers.updateExerciseSet);
app.delete(strenghtRoutes.deleteExerciseSet, authenticateToken, strengthControllers.deleteExerciseSet);
app.delete(strenghtRoutes.deleteStrengthExercise, authenticateToken, strengthControllers.deleteStrengthExercise);

// ---------- Feeding Endpoints ----------
app.post(feedingRoutes.addFood, jsonParser, authenticateToken, feedingControllers.addFood);
app.get(feedingRoutes.getFoods, authenticateToken, feedingControllers.getFoods);

// ---------- Cathegory Endpoints ----------
app.post(cathegoryRoutes.addCathegory, jsonParser, authenticateToken, cathegoryControllers.addCathegory);
app.get(cathegoryRoutes.getCathegories, authenticateToken, cathegoryControllers.getCathegoriesList);
app.delete(cathegoryRoutes.deleteCathegory, authenticateToken, cathegoryControllers.deleteCathegory);

// ---------- Exercise Presets Endpoints ----------
app.get(presetRoutes.getExercisePresets, authenticateToken, presetsControllers.getPresets);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
