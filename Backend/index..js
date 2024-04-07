import {addUser} from "./controllers/addUser";
import { checkLogin } from "./controllers/checkLogin";
import { addUserEjercicio } from "./controllers/addUserEjercicio";
import { getUserCardio } from "./controllers/getUserCardio";
import { getUserFuerza } from "./controllers/getUserFuerza";
import { removeUserEjercicio } from "./controllers/removeUserEjercicio";
import { removeUser } from "./controllers/removeUser";

const express=require('express');
const app=express();

app.get("/addUser",addUser);
app.delete("/removeUser",removeUser);
app.get("/checkLogin",checkLogin);
app.get("/addUserEjercicio",addUserEjercicio);
app.get("/getUserCardio",getUserCardio);
app.get("/getUserFuerza",getUserFuerza);
app.delete("/removeEjercicio",removeUserEjercicio);
