import express from "express";
import * as controllers from "./controllers/controller.js";
import * as userControllers from "./controllers/user-controllers.js"
import cors from "cors";

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


app.post("/removeUser", jsonParser, controllers.removeUser); 
app.post("/checkLogin", jsonParser, controllers.checkLogin); 
app.post("/addStrengthExercise", jsonParser, controllers.addStrengthExercise); 
app.post("/addCardioExercise", jsonParser, controllers.addCardioExercise); 
app.post("/addUserStrengthExercise", jsonParser, controllers.addUserStrengthExercise); 
app.post("/addUserCardioExercise", jsonParser, controllers.addUserCardioExercise); 

app.post("/getUserCardio", jsonParser, controllers.getUserCardio);
app.post("/getUserFuerza", jsonParser, controllers.getUserFuerza);
app.post("/removeEjercicio", jsonParser, controllers.removeUserEjercicio); 
app.post("/getUser",jsonParser,controllers.getUser);

app.use("/test", controllers.testPruebas);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
