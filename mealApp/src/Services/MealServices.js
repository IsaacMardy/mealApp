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
            return response.data.meals; // Returning meals to the caller
        } else {
            console.error('No meals found');
            return []; // Returning an empty array if no meals are found
        }
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw new Error('Error fetching meals'); // Propagating the error for caller to handle
    }
}

export async function getUserMeals(userId) {
    try {
        const response = await axios.get('http://localhost:5001/getUserMeals', { params: { userId } });
        console.log('Fetched meals from API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching usermeals:', error);
        throw new Error('Failed to fetch usermeals');
    }
}
