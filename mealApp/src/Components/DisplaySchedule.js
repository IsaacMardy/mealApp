import React, { useState, useEffect } from 'react';
import { addPersonalSchedule, getSchedule, publishSchedule, setSchedule as setRealSchedule } from '../Services/SelectedSchedule';
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
        if (scheduleName) {
            const completeSchedule = { ...schedule, scheduleName: scheduleName }
            saveSchedule(completeSchedule)
            addPersonalSchedule(completeSchedule)
            alert("Saved")
        } else {
            alert("Please Put a name for the schedule to save")
        }
    }

    const publishingSchedule = () => {
        if (scheduleName) {
            const completeSchedule = { ...schedule, scheduleName: scheduleName }
            saveSchedule(completeSchedule)
            publishSchedule(completeSchedule)
            alert("Published")
        } else {
            alert("Please Put a name for the schedule to publish")
        }
    }

    const deleteItem = (mealType, index) => {
        const updatedSchedule = { ...schedule }; // Create a shallow copy of the schedule
        updatedSchedule[mealType].splice(index, 1); // Remove the item at the given index
        setSchedule(updatedSchedule); // Update the state
        setRealSchedule(updatedSchedule)
    };

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
                                    <td>{index === 0 ? "SundayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("SundayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Sunday0">Add Meal Sunday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Sunday Breakfast</td>
                            <td><Link to="/DisplayMeals/Sunday0">Add Meal Sunday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.SundayLunch?.length > 0 ? (
                        <>
                            {schedule.SundayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "SundayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("SundayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Sunday1">Add Meal Sunday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Sunday Lunch</td>
                            <td><Link to="/DisplayMeals/Sunday1">Add Meal Sunday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.SundayDinner?.length > 0 ? (
                        <>
                            {schedule.SundayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "SundayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("SundayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Sunday2">Add Meal Sunday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Sunday Dinner</td>
                            <td><Link to="/DisplayMeals/Sunday2">Add Meal Sunday Dinner</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.MondayBreakfast?.length > 0 ? (
                        <>
                            {schedule.MondayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "MondayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("MondayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Monday0">Add Meal Monday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Monday Breakfast</td>
                            <td><Link to="/DisplayMeals/Monday0">Add Meal Monday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.MondayLunch?.length > 0 ? (
                        <>
                            {schedule.MondayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "MondayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("MondayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Monday1">Add Meal Monday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Monday Lunch</td>
                            <td><Link to="/DisplayMeals/Monday1">Add Meal Monday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.MondayDinner?.length > 0 ? (
                        <>
                            {schedule.MondayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "MondayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("MondayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Monday2">Add Meal Monday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Monday Dinner</td>
                            <td><Link to="/DisplayMeals/Monday2">Add Meal Monday Dinner</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.TuesdayBreakfast?.length > 0 ? (
                        <>
                            {schedule.TuesdayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "TuesdayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("TuesdayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Tuesday0">Add Meal Tuesday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Tuesday Breakfast</td>
                            <td><Link to="/DisplayMeals/Tuesday0">Add Meal Tuesday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.TuesdayLunch?.length > 0 ? (
                        <>
                            {schedule.TuesdayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "TuesdayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("TuesdayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Tuesday1">Add Meal Tuesday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Tuesday Lunch</td>
                            <td><Link to="/DisplayMeals/Tuesday1">Add Meal Tuesday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.TuesdayDinner?.length > 0 ? (
                        <>
                            {schedule.TuesdayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "TuesdayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("TuesdayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Tuesday2">Add Meal Tuesday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Tuesday Dinner</td>
                            <td><Link to="/DisplayMeals/Tuesday2">Add Meal Tuesday Dinner</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.WednesdayBreakfast?.length > 0 ? (
                        <>
                            {schedule.WednesdayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "WednesdayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("WednesdayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Wednesday0">Add Meal Wednesday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Wednesday Breakfast</td>
                            <td><Link to="/DisplayMeals/Wednesday0">Add Meal Wednesday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.WednesdayLunch?.length > 0 ? (
                        <>
                            {schedule.WednesdayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "WednesdayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("WednesdayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Wednesday1">Add Meal Wednesday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Wednesday Lunch</td>
                            <td><Link to="/DisplayMeals/Wednesday1">Add Meal Wednesday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.WednesdayDinner?.length > 0 ? (
                        <>
                            {schedule.WednesdayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "WednesdayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("WednesdayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Wednesday2">Add Meal Wednesday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Wednesday Dinner</td>
                            <td><Link to="/DisplayMeals/Wednesday2">Add Meal Wednesday Dinner</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.ThursdayBreakfast?.length > 0 ? (
                        <>
                            {schedule.ThursdayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "ThursdayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("ThursdayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Thursday0">Add Meal Thursday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Thursday Breakfast</td>
                            <td><Link to="/DisplayMeals/Thursday0">Add Meal Thursday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.ThursdayLunch?.length > 0 ? (
                        <>
                            {schedule.ThursdayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "ThursdayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("ThursdayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Thursday1">Add Meal Thursday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Thursday Lunch</td>
                            <td><Link to="/DisplayMeals/Thursday1">Add Meal Thursday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.ThursdayDinner?.length > 0 ? (
                        <>
                            {schedule.ThursdayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "ThursdayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("ThursdayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Thursday2">Add Meal Thursday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Thursday Dinner</td>
                            <td><Link to="/DisplayMeals/Thursday2">Add Meal Thursday Dinner</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.FridayBreakfast?.length > 0 ? (
                        <>
                            {schedule.FridayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "FridayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("FridayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Friday0">Add Meal Friday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Friday Breakfast</td>
                            <td><Link to="/DisplayMeals/Friday0">Add Meal Friday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.FridayLunch?.length > 0 ? (
                        <>
                            {schedule.FridayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "FridayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("FridayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Friday1">Add Meal Friday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Friday Lunch</td>
                            <td><Link to="/DisplayMeals/Friday1">Add Meal Friday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.FridayDinner?.length > 0 ? (
                        <>
                            {schedule.FridayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "FridayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("FridayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Friday2">Add Meal Friday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Friday Dinner</td>
                            <td><Link to="/DisplayMeals/Friday2">Add Meal Friday Dinner</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.SaturdayBreakfast?.length > 0 ? (
                        <>
                            {schedule.SaturdayBreakfast.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "SaturdayBreakfast" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("SaturdayBreakfast", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Saturday0">Add Meal Saturday Breakfast</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Saturday Breakfast</td>
                            <td><Link to="/DisplayMeals/Saturday0">Add Meal Saturday Breakfast</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.SaturdayLunch?.length > 0 ? (
                        <>
                            {schedule.SaturdayLunch.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "SaturdayLunch" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("SaturdayLunch", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Saturday1">Add Meal Saturday Lunch</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Saturday Lunch</td>
                            <td><Link to="/DisplayMeals/Saturday1">Add Meal Saturday Lunch</Link></td>
                            <td></td>
                        </tr>
                    )}

                    {schedule.SaturdayDinner?.length > 0 ? (
                        <>
                            {schedule.SaturdayDinner.map((meal, index) => (
                                <tr key={index}>
                                    <td>{index === 0 ? "SaturdayDinner" : ""}</td>
                                    <td>{meal.mealName || "No meal"}</td>
                                    <td><button onClick={() => deleteItem("SaturdayDinner", index)}>
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td><Link to="/DisplayMeals/Saturday2">Add Meal Saturday Dinner</Link></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td>Saturday Dinner</td>
                            <td><Link to="/DisplayMeals/Saturday2">Add Meal Saturday Dinner</Link></td>
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