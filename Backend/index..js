import { addUser,removeUser,checkLogin,addUserEjercicio,removeUserEjercicio,getUserCardio,getUserFuerza,testpruebas } from './controllers/controller';

const express=require('express');
const app=express();

app.get("/addUser",addUser);
app.delete("/removeUser",removeUser);
app.get("/checkLogin",checkLogin);
app.get("/addUserEjercicio",addUserEjercicio);
app.get("/getUserCardio",getUserCardio);
app.get("/getUserFuerza",getUserFuerza);
app.delete("/removeEjercicio",removeUserEjercicio);

app.get("/test",testpruebas);
