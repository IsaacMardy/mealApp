import React, { useState } from 'react';
import { addMeal } from '../Services/MealServices';
import './InputMeals.css';
function InputMeals() {
    const [mealName, setMealName] = useState("");
    const [ingredients, setIngredients] = useState([""]); // Starting with one empty ingredient field
    const [day, setDay] = useState(""); // set the day of the week
    const [mealType, setMealType] = useState(""); //  meal type (breakfast, lunch, dinner)

    const submitMeal = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!day || !mealType) {
            alert("Please select both a day and a meal type.");
            return;
        }

        const mealData = {
            mealName: mealName,
            ingredients: ingredients.filter(ingredient => ingredient.trim() !== ""),
            day,
            mealType,
        };

        try {
            await addMeal(mealData);
            alert("Meal added successfully!");
           window.location.reload();
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        if (ingredients[ingredients.length - 1].trim() !== "") {
            setIngredients([...ingredients, ""]);
        } else {
            alert("Please fill in the current ingredient before adding a new one.");
        }
    };

    // text box for cooking instruction
    //list for nutrition
    return (
        <div>
            <form className="form-group" onSubmit={submitMeal}>
                <label className="form-control">Meal Name:</label>
                <input
                    type="text"
                    id="mealName"
                    name="mealName"
                    placeholder="Meal Name"
                    className="form-control"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                />

                <label className="form-control">Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-group">
                        <input
                            type="text"
                            placeholder={`Ingredient ${index + 1}`}
                            className="form-control"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e)} // Update the ingredient value
                        />
                    </div>
                ))}

                <button type="button" className="btn btn-secondary" onClick={addIngredient}>
                    Add Ingredients
                </button>

                <label className="form-control">Day of the Week:</label>
                <select
                    className="form-control"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                >
                    <option value="">Select Day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>

                <label className="form-control">Meal Type:</label>
                <select
                    className="form-control"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                >
                    <option value="">Select Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <br />
                <button type="submit" className="btn btn-primary">Submit Meal</button>
            </form>
        </div>
    );
}

export default InputMeals;
