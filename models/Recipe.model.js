const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    title: { type: String, required: true },
    level: { type: String, enum: ["Easy", "Medium", "Hard"] },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    dishType: { type: String, enum: ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert", "Other"] },
    image: { type: String },
    duration: { type: Number, min: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
  );

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
