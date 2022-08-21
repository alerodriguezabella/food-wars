// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "food-wars";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

const session =require('express-session');
const mongoStore = require('connect-mongo');
const mongoose = require('mongoose');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24,
        },
        store: new mongoStore({
            mongoUrl: 'mongodb://0.0.0.0/food-wars',
            })
    })
)

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require ('./routes/auth.routes');
app.use('/auth', authRoutes)

const recRoutes = require ('./routes/recipe.routes');
app.use('/recipes', recRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
