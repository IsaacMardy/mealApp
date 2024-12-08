function ScrollingList({ items, selectedItem, updateSelectedItem }) {
    // Handle item selection
    const handleItemClick = (item) => {
        updateSelectedItem(item); // Send the selected item's name to the parent
    };

    return (
        <div 
            style={{
                float:"left",
                width: '40%', 
                height: '100%',
                overflowY: 'scroll',
                border: '1px solid #ccc',
            }}
        >
            {items.length === 0 ? (
                <p style={{ padding: '10px' }}>No meals available.</p>
            ) : (
                <ul style={{ padding: 0, margin: 0 }}>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                padding: '10px',
                                borderBottom: '1px solid #ddd',
                                cursor: 'pointer', // Indicate it's clickable
                                backgroundColor: selectedItem === item.mealName ? '#d3f8d3' : 'transparent', // Highlight selected item
                            }}
                            onClick={() => handleItemClick(item)} // Handle item click
                            tabIndex={0} // Make it focusable
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleItemClick(item); // Handle Enter key
                            }}
                            aria-selected={selectedItem === item.mealName} // ARIA attribute for accessibility
                        >
                            {item.mealName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScrollingList;