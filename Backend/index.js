const express=require('express');
const app=express();
const port=3000;

const controllers=require('./controllers/controller.js');

app.get("/addUser",controllers.addUser);
app.delete("/removeUser",controllers.removeUser);
app.get("/checkLogin",controllers.checkLogin);
app.get("/addUserEjercicio",controllers.addUserEjercicio);
app.get("/getUserCardio",controllers.getUserCardio);
app.get("/getUserFuerza",controllers.getUserFuerza);
app.delete("/removeEjercicio",controllers.removeUserEjercicio);

app.use("/test",controllers.testPruebas);


app.listen(port, () => {
    console.log("App listening on port ${port}");
})
