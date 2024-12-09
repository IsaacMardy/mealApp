import React, { useEffect, useState } from 'react';
import { getSchedule } from '../Services/SelectedSchedule';

function DisplayIngredients() {
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const fetchedSchedule = getSchedule(); // Retrieve schedule from singleton
        setSchedule(fetchedSchedule); // Set the state with the fetched schedule
        console.log(fetchedSchedule); // Optional: to see the schedule in the console
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>Ingredients for the Week</h1>
            {Object.keys(schedule).map((mealType) => (
                <div key={mealType}>
                    <h2>{mealType}</h2>
                    <ul>
                        {Array.isArray(schedule[mealType]) && schedule[mealType].length > 0 ? (
                            schedule[mealType].map((meal, index) => {
                                const { mealName, ingredients } = meal; // Extract 'mealName' and 'ingredients'
                                return (
                                    <li key={meal._id || index}>
                                        <h3>{mealName || `Meal ${index + 1}`}</h3> {/* Use mealName if available */}
                                        <ul>
                                            {Array.isArray(ingredients) && ingredients.length > 0 ? (
                                                ingredients.map((ingredient, i) => (
                                                    <li key={i}>{ingredient}</li>
                                                ))
                                            ) : (
                                                <li>No ingredients available for this meal.</li>
                                            )}
                                        </ul>
                                    </li>
                                );
                            })
                        ) : (
                            <li>No meals scheduled for {mealType}.</li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default DisplayIngredients;
