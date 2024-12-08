import React, { useEffect, useState } from 'react';
import { getSchedule } from '../Services/SelectedSchedule';

function DisplayIngredients() {
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const fetchedSchedule = getSchedule(); // Retrieve schedule from singleton
        const temp = {
            Sunday:fetchedSchedule.Sunday,
            Monday:fetchedSchedule.Monday,
            Tuesday:fetchedSchedule.Tuesday,
            Wednesday:fetchedSchedule.Wednesday,
            Thursday:fetchedSchedule.Thursday,
            Friday:fetchedSchedule.Friday,
            Saturday:fetchedSchedule.Saturday
        }
        setSchedule(temp); // Set the state with the fetched schedule
        console.log(fetchedSchedule); // Optional: to see the schedule in the console
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>Ingredients for the Week</h1>
            {Object.keys(schedule).map((day) => (
                <div key={day}>
                    <h2>{day}</h2>
                    <ul>
                        {Array.isArray(schedule[day]) && schedule[day].length > 0 ? (
                            schedule[day].map((meal, index) => {
                                // Destructure meal to omit the 'id' field
                                const { id, ingredients, mealName } = meal; // Extract 'id', 'mealName', and 'ingredients'

                                // Check if ingredients are present
                                if (Array.isArray(ingredients) && ingredients.length > 0) {
                                    return (
                                        <div key={index}>
                                            <h3>{mealName || `Meal ${index + 1}`}</h3> {/* Use mealName if available */}
                                            <ul>
                                                {ingredients.map((ingredient, i) => (
                                                    <li key={i}>{ingredient}</li> // List each ingredient individually
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                } else {
                                    return <li key={index}>No ingredients available for this meal.</li>;
                                }
                            })
                        ) : (
                            <li>No meals scheduled for {day}.</li> // If no meals for the day
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default DisplayIngredients;
