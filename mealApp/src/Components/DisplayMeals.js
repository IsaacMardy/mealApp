import React, { useEffect, useState } from 'react';
import ScrollingList from './ScrollingList';
import ScrollingBox from './ScrollingBox'
import { getAllMeals } from '../Services/MealServices';

function DisplayMeals() {
    const [meals, setMeals] = useState([]); // State to hold fetched meals
    const [sharedData, setSharedData] = useState(''); // State for selected meal
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    // Function to update shared data (triggered by ScrollingList)
    const updateSharedData = (newData) => {
        setSharedData(newData);
    };

    // Fetch all meals on component mount
    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedMeals = await getAllMeals(); // Wait for the meals to be fetched
                setMeals(fetchedMeals);
            } catch (error) {
                console.error('Error fetching meals:', error);
                setError('Failed to load meals.');
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    /**
     * update: align the ScrollingList and ScrollingBox components side by side
     */
    return (
        <div>
            <h1>Meal Display</h1>
            {loading ? (
                <p>Loading meals...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'flex-start',
                    }}
                >
                    {/* Scrolling List */}
                    <ScrollingList 
                        items={meals} 
                        selectedItem={sharedData} 
                        updateSelectedItem={updateSharedData} 
                    />
                    
                    {/* Scrolling Box */}
                    <ScrollingBox selectedItem={sharedData} />
                </div>
            )}
        </div>
    );
}

export default DisplayMeals;
