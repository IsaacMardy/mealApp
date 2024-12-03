import React from 'react';

function ScrollingBox({ selectedItem }) {

    return (
        <div style={{ float:"left", width: '40%', height: '100%', overflow: 'auto', border: '1px solid #ccc' }}>
            <div style={{ padding: '20px' }}>
                {selectedItem ? (
                    <>
                        <p>{selectedItem.mealName}</p>
                        <ul>
                            {selectedItem.ingredients.map((item, index) => (
                                <li key={index}>{item}</li> // You can use `index` as a fallback key, but it's better to use a unique identifier like `item.id` if available
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No item selected.</p> // Render this message when `selectedItem` is falsy
                )}
            </div>
        </div>
    );
    
}

export default ScrollingBox;
