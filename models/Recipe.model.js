const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    title: { type: String, required: true },
    level: { type: String, enum: ["Easy", "Medium", "Hard"] },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    // cuisine: { type: String },
    dishType: { type: String, enum: ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert", "Other"] },
    image: { type: String, default: "https://images.unsplash.com/photo-1628209694088-9aa9ac1c6463?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80" },
    duration: { type: Number, min: 0 },
    // creator: { type: String },
    // created: { type: Date, default: Date.now }
  },
  { timestamps: true }
  );

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
