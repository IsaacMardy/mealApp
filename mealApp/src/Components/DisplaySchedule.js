import React, { useState, useEffect } from 'react';
import { addPersonalSchedule, getSchedule, publishSchedule } from '../Services/SelectedSchedule';
import { Link } from "react-router-dom";
import { saveSchedule } from "../Services/UserServices"

function DisplaySchedule() {
    const [schedule, setSchedule] = useState({});
    const [scheduleName, setScheduleName] = useState("");

    useEffect(() => {
        const fetchedSchedule = getSchedule(); // Retrieve schedule from singleton
        setSchedule(fetchedSchedule); // Set the state with the fetched schedule
    }, []); // Empty dependency array ensures this runs only once

    const savingSchedule = () => {
        if(scheduleName){
            const completeSchedule = {...schedule,scheduleName:scheduleName}
            saveSchedule(completeSchedule)
            addPersonalSchedule(completeSchedule)
        }else{
            alert("Please Put a name for the schedule to save")
        }
    }

    const publishingSchedule = () => {
        if(scheduleName){
            const completeSchedule = {...schedule,scheduleName:scheduleName}
            saveSchedule(completeSchedule)
            publishSchedule(completeSchedule)
        }else{
            alert("Please Put a name for the schedule to publish")
        }
    }

    return (
        <div>
            <label className="form-control">Schedule Name:</label>
            <input
                type="text"
                id="scheduleName"
                name="scheduleName"
                placeholder="Schedule Name"
                className="form-control"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
            />

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
            <button onClick={publishingSchedule}>Save and Publish</button>
        </div>
    );
}

export default DisplaySchedule;
