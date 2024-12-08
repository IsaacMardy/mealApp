import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealName: { type: String, required: true },
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

