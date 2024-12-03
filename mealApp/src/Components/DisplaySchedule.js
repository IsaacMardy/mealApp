import React, { useState, useEffect } from 'react';
import { getSchedule } from '../Services/SelectedSchedule';
import { Link } from "react-router-dom";

function DisplaySchedule() {
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const fetchedSchedule = getSchedule(); // Retrieve schedule from singleton
        setSchedule(fetchedSchedule); // Set the state with the fetched schedule
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>Editable Table</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Edit</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sunday Breakfast</td>
                        {/* Check if Sunday exists and access index 0 safely */}
                        <td>{schedule.Sunday?.[0]?.mealName || "No meal"}</td>
                        <td><Link to="/DisplayMeals/Sunday0">Add Meal</Link></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DisplaySchedule;
