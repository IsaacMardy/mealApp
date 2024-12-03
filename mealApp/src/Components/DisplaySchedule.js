import React, { useState, useEffect } from 'react';

function DisplaySCedule() {

    // const [schedule, setSchedule] = useState([]); // State to hold fetched meals
    const [mealList, setMealList] = useState([]);

    useEffect(() => {
        const meals = {breakFast:{}, lunch:{}, dinner:{}}
        const days = {
            Sunday: meals,
            Monday: meals,
            Tuesday: meals,
            Wednesday: meals,
            Thursday: meals,
            Friday: meals,
            Saturday: meals
        };

        setMealList(days)
        console.log(days)
    },[])

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
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DisplaySCedule;