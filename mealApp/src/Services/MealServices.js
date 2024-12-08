import axios from "axios";

export async function addMeal(meal) {
    try {
        const response = await axios.post('http://localhost:5001/addMeal', meal);
        console.log('Meal added successfully:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error adding meal:', error);
        throw new Error('Error adding meal'); // Propagate the error
    }
}


export async function getAllMeals() {
    try {
        const response = await axios.get('http://localhost:5001/getAllMeals');
        if (response.data && response.data.meals) {
            console.log(response.data.meals);
            return response.data.meals; // Return meals to the caller
        } else {
            console.error('No meals found');
            return []; // Return an empty array if no meals are found
        }
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw new Error('Error fetching meals'); // Propagate the error for caller to handle
    }
}