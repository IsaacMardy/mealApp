import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealName: { type: String, required: true },
    ingredients: [{ type: String }], // Array of strings for ingredients
    day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
    mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // user reference
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

