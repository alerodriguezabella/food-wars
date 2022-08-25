require('dotenv').config();
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");
const data = require("../data");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/food-wars";

console.log(process.env)

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .then(() => {
    return createMultipleRecipeObjects();
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// INSERT MULTIPLE
const createMultipleRecipeObjects = () =>
  Recipe.insertMany(data)
    .then((results) => console.log(`Saved new recipes: ${results}`))
    .catch((saveErr) => console.error(`Save failed: ${saveErr}`));

// Ran the command node seeds/recipes.seed.js in order to seed the DB