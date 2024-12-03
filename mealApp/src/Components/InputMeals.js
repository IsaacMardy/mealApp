import React, { useState } from 'react';
import { addMeal } from '../Services/MealServices';

function InputMeals() {
    const [mealName, setMealName] = useState("");
    const [ingredients, setIngredients] = useState([""]); // Start with one empty ingredient field

    const submitMeal = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const mealData = {
            mealName: mealName,
            ingredients: ingredients.filter(ingredient => ingredient.trim() !== "") // Filter out empty ingredients
        };

        try {
            await addMeal(mealData);
            alert("Meal added successfully!");
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients); // Update the specific ingredient at the given index
    };

    const addIngredient = () => {
        if (ingredients[ingredients.length - 1].trim() !== "") {
            setIngredients([...ingredients, ""]); // Add a new empty ingredient field
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
                <br />
                <button type="submit" className="btn btn-primary">Submit Meal</button>
            </form>
        </div>
    );
}

export default InputMeals;
