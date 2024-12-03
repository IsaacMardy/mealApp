import React, { useEffect, useState } from 'react';
import { getUserMeals } from '../Services/MealServices';

function DisplayScedule() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     // Fetching meals for the logged in user
     useEffect(() => {
        const fetchMeals = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // will get user info from local storage
            if (!loggedInUser) return;

            setLoading(true);
            try {
                const fetchedMeals = await getUserMeals(loggedInUser._id); // will Fetch meals for the logged in user
                const validMeals = fetchedMeals.filter(meal => meal.day && meal.mealType);
                setMeals(validMeals);
            } catch (error) {
                console.error('Error fetching meals:', error);
                setError('Failed to fetch meals.');
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    return (
        <div>
            <h1>Meal Schedule</h1>
            {loading ? (
                <p>Loading meals...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (


                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Day</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Meal Type</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Meal Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Edit</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.length > 0 ? (
                        meals.map((meal) => (
                            <tr key={meal._id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{meal.day}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{meal.mealType}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{meal.mealName}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => console.log('Edit:', meal._id)}>Edit</button>
                                </td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => console.log('Delete:', meal._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>
                                No meals found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )}
    </div>
);
}

export default DisplayScedule;