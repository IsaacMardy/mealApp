import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealName: { type: String, required: true },
    ingredients: [{ type: String }], // Array of strings for ingredients
    nutrition: { // Object to store the nutritional values
        calories: Number,
        protein: Number,
        fat: Number,
        carbs: Number,
    },
    category: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], default: 'Lunch' }
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

