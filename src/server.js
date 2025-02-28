// import express to begin using it
const express = require("express");
const { default: mongoose, models } = require("mongoose");

// make an instance of an express server
const app = express();

app.use(express.json());

// configure the server instance with its routes and other middleware and so on
app.get("/", (request, response) => {
    response.json({
        message: "Hello, World!"
    });
});


app.get("/databaseHealth", (request, response) => {

    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.modelNames();
    let databaseHost = mongoose.connection.host;
    response.json({

    readyState: databaseState,
    name: databaseName,
    models: databaseModels,
    host: databaseHost
    })
})

const UserRouter = require("./controllers/UserController");
app.use("/users", UserRouter);

module.exports = {
    app
}

