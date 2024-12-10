import React, { useEffect, useState } from 'react';
import ScrollingList from './ScrollingList';
import ScrollingBox from './ScrollingBox'
import { getAllMeals } from '../Services/MealServices';
import { Link } from "react-router-dom";
import { addMealtoSchedule } from '../Services/SelectedSchedule';
import { addRecommendation } from '../Services/DieticianServices'; // New service for recommendations
import { useParams } from 'react-router-dom';

function DisplayMeals() {
    const { Time } = useParams();
    const [meals, setMeals] = useState([]); // State to hold fetched meals
    const [sharedData, setSharedData] = useState(''); // State for selected meal
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [filter, setFilter] = useState(''); // State for the ingredient filter
    const [filteredMeals, setFilteredMeals] = useState([]); // State for filtered meals
    const [isDietician, setIsDietician] = useState(false); // State to check if user is a dietician
    const [recommendation, setRecommendation] = useState(""); // State to


    // Function to update shared data
    const updateSharedData = (newData) => {
        setSharedData(newData);
    };


    // Fetch all meals and check user role
    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedMeals = await getAllMeals();
                setMeals(fetchedMeals);
                setFilteredMeals(fetchedMeals);
                
                const userRole = await checkUserRole();
                setIsDietician(userRole === "dietician");
            } catch (error) {
                console.error('Error fetching meals:', error);
                setError('Failed to load meals.');
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    const addMeal = (Time, sharedData) => {
        if(sharedData){
            addMealtoSchedule(Time, sharedData)
        }else{
            console.log("nothing to add")
        }
    }

    // Function to filter meals by ingredients
    const filterMeals = () => {
        if (filter.trim() === '') {
            setFilteredMeals(meals);
            return;
        }
        const filtered = meals.filter(meal =>
            meal.ingredients &&
            meal.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(filter.toLowerCase())
            )
        );
        setFilteredMeals(filtered);
    };

      // Function to reset the filter
    const resetFilter = () => {
        setFilteredMeals(meals);
        setFilter('');
    };

     // Function to handle recommendation submission
    const handleRecommendationSubmit = async () => {
        if (sharedData && recommendation.trim() !== "") {
            try {
                await addRecommendation(sharedData, recommendation);
                alert("Recommendation added successfully!");
                setRecommendation(""); // Clear the input field
            } catch (error) {
                console.error("Error adding recommendation:", error);
                alert("Failed to add recommendation. Please try again.");
            }
        } else {
            alert("Please select a meal and add a recommendation.");
        }
    };

    // fix box and list size
   
    return (
        <div>
            <h1>Meal Display</h1>
            {loading ? (
                <p>Loading meals...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Filter by ingredient"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <button onClick={filterMeals}>Filter</button>
                        <button onClick={resetFilter}>Reset Filter</button>
                    </div>
                    <ScrollingList
                        items={filteredMeals} // Display filtered meals
                        selectedItem={sharedData} 
                        updateSelectedItem={updateSharedData}
                    />
                </>
            )}
            <ScrollingBox selectedItem={sharedData}></ScrollingBox>

            {Time ? (
                <Link to="/DisplayScedule/" onClick={() => addMeal(Time, sharedData)}>Select</Link>
            ):(
                <div></div>
              
              {isDietician && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Add a Recommendation</h2>
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="Write your recommendation here..."
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                    />
                    <button onClick={handleRecommendationSubmit}>Submit Recommendation</button>
                </div>
            )}
        </div>
    );
}

export default DisplayMeals;
