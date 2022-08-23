// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");


require("./db");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const logger = require("morgan");
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const passport=require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;


const { google, mongodb } = require("./config/keys.configs");

const hbs = require("hbs");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "food-wars";

app.locals.appTitle = 'Created with IronLauncher';

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, callback) => {
    callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
    User.findById(id)
    .then((user) => callback(null, user))
    .catch((err) => callback(err));
})

passport.use(
    new LocalStrategy(
      {
        usernameField: "username", // by default
        passwordField: "password", // by default
      },
      (username, password, done) => {
        User.findOne({ username })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }
  
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: "Incorrect password" });
            }
  
            done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: google.clientID,
        clientSecret: google.clientSecret,
        callbackURL: "/auth/google/redirect",
        scope: ["profile"] // --> required field for the "/auth/google/redirect" redirect to be successful
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        console.log(profile);
        User.findOne({
          googleId: profile.id,
        }).then((currentUser) => {
          if (currentUser) {
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else {
            //if not, create a new user
            new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);
app.use("/", require("./routes/google.routes"));

const authRouter = require ('./routes/auth.routes');
app.use('/auth', authRouter)

const recipeRouter = require ('./routes/recipe.routes');
app.use('/recipes', recipeRouter)

const comRouter = require ('./routes/comment.routes');
const User = require("./models/User.model");
app.use('/comments', comRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);



module.exports = app;
