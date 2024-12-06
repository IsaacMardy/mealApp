import React, { useState, useEffect } from 'react';
import { addPersonalSchedule, getSchedule } from '../Services/SelectedSchedule';
import { Link } from "react-router-dom";
import { saveSchedule } from "../Services/UserServices"

function DisplaySchedule() {
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const fetchedSchedule = getSchedule(); // Retrieve schedule from singleton
        setSchedule(fetchedSchedule); // Set the state with the fetched schedule
    }, []); // Empty dependency array ensures this runs only once

    const savingSchedule = () => {
        console.log(schedule)
        saveSchedule(schedule)
        addPersonalSchedule(schedule)
    }

    return (
        <div>
            <h1>Editable Table</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
                    </tr>
                </thead>


                <tbody>
                    {schedule.SundayBreakfast?.length > 0 ? (
                        <>
                            {schedule.SundayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "Sunday Breakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Sunday0">Add Meal</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Sunday Breakfast</td>
                            <td><Link to="/DisplayMeals/Sunday0">Add Meal</Link></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>

            </table>
            <button onClick={savingSchedule}>Save</button>
        </div>
    );
}

export default DisplaySchedule;
