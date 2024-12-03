import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplaySCedule() {

    const [schedule, setSchedule] = useState([]); // State to hold fetched schedule
    const user = localStorage.getItem('loggedInUser'); //State to hold user

    useEffect(() => {
        axios.get('http://localhost:9000/getSchedule', {params: {user_id: user}})
        .then(function (response) {
          setSchedule(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        }, []);

    const handleSaveSchedule = (event, userID, sundayBreakfastMealID, sundayLunchMealID, sundayDinnerMealID, mondayBreakfastMealID, 
        mondayLunchMealID, mondayDinnerMealID, tuesdayBreakfastMealID, tuesdayLunchMealID, tuesdayDinnerMealID, wednesdayBreakfastMealID, 
        wednesdayLunchMealID, wednesdayDinnerMealID, thursdayBreakfastMealID, thursdayLunchMealID, thursdayDinnerMealID, fridayBreakfastMealID, 
        fridayLunchMealID, fridayDinnerMealID, saturdayBreakfastMealID, saturdayLunchMealID, saturdayDinnerMealID) => {
        event.preventDefault()
        axios.post('http://localhost:9000/saveSchedule', { userID, sundayBreakfastMealID, sundayLunchMealID, sundayDinnerMealID, mondayBreakfastMealID, 
        mondayLunchMealID, mondayDinnerMealID, tuesdayBreakfastMealID, tuesdayLunchMealID, tuesdayDinnerMealID, wednesdayBreakfastMealID, 
        wednesdayLunchMealID, wednesdayDinnerMealID, thursdayBreakfastMealID, thursdayLunchMealID, thursdayDinnerMealID, fridayBreakfastMealID, 
        fridayLunchMealID, fridayDinnerMealID, saturdayBreakfastMealID, saturdayLunchMealID, saturdayDinnerMealID })
            .catch((err) => alert('Error in Saving Schedule'))
    }

    return (
        <div>
            <form>
                <h1>Weekly Schedule</h1>
                <button type="button" onClick={(event) => {
                    handleSaveSchedule(event, user.userID, schedule.sundayBreakfastMealID, schedule.sundayLunchMealID, schedule.sundayDinnerMealID, schedule.mondayBreakfastMealID, 
                        schedule.mondayLunchMealID, schedule.mondayDinnerMealID, schedule.tuesdayBreakfastMealID, schedule.tuesdayLunchMealID, schedule.tuesdayDinnerMealID, schedule.wednesdayBreakfastMealID, 
                        schedule.wednesdayLunchMealID, schedule.wednesdayDinnerMealID, schedule.thursdayBreakfastMealID, schedule.thursdayLunchMealID, schedule.thursdayDinnerMealID, schedule.fridayBreakfastMealID, 
                        schedule.fridayLunchMealID, schedule.fridayDinnerMealID, schedule.saturdayBreakfastMealID, schedule.saturdayLunchMealID, schedule.saturdayDinnerMealID)
                }}>Save Schedule </button>
                            </form>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>Day of the week & Time of day</th>
                        <th style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>Add/Edit</th>
                        <th style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Sunday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}>
                            <button>Add/Edit Meal</button>
                        </td>
                        <td style={{ border: '1px solid black' }}>
                            <button>Delete Meal</button>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Sunday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Sunday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Monday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Monday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Monday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Tuesday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Tuesday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Tuesday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Wednesday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Wednesday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Wednesday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Thursday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Thursday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Thursday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Friday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Friday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Friday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Saturday - Breakfast</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Saturday - Lunch</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black' }}>Saturday - Dinner</td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                        <td style={{ border: '1px solid black' }}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DisplaySCedule;