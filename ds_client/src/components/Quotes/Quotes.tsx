import React, { useState, useEffect } from 'react';
import './Quotes.css'; // Import the CSS file for styling

function Quotes() {
    const [quote, setQuote] = useState(null); // Use state to store the quote
    const api_url = "https://portfolio-website-qtg9.onrender.com/api/random_quote/";

    // Function to fetch data from the API
    async function getapi() {
        try {
            const response = await fetch(api_url); // Use the correct variable
            const data = await response.json();
            setQuote(data.quote); // Update state with the first quote
        } catch (error) {
            console.error("Error fetching quotes:", error);
        }
    }

    // Fetch the quote when the component mounts
    useEffect(() => {
        getapi();
    }, []);

    return (
        <div className="quote-container">
        {quote ? (
            <div className="scrolling-quote">{quote}</div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
}

export default Quotes;