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
