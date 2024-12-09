import axios from "axios";

export const addRecommendation = async (mealID, recommendation) => {
    try {
		const response = await axios.post('http://localhost:5001/checkUserRole', {
            mealID,
            recommendation,
        });
        console.log('Recommendation added successfully:', response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add recommendation");
    }
};

export const checkUserRole = async () => {
    try {
        const response = await axios.get('http://localhost:5001/checkUserRole'); // Adjust the endpoint based on backend setup
        return response.data.role; // Assumes the backend returns { role: "dietician" }
    } catch (error) {
        console.error('Error checking user role:', error);
        throw new Error('Failed to check user role.');
    }
};

