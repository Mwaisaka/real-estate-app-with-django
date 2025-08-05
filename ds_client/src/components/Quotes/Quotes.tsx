import React, { useState, useEffect } from "react";
import "./Quotes.css"; // Import the CSS file for styling

function Quotes() {
  const [quote, setQuote] = useState(""); // Use state to store the quote
  const api_url =
    "https://portfolio-website-qtg9.onrender.com/api/random_quote/";
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchQuote();
  }, []);

  async function fetchQuote() {
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }

  useEffect(() => {
    let timeout;
    if (!quote) return;

    if (!isDeleting && index < quote.length) {
      timeout = setTimeout(() => {
        setDisplayedQuote((prev) => prev + quote.charAt(index));
        setIndex((prev) => prev + 1);
      }, 100);
    } else if (!isDeleting && index === quote.length) {
      //Pause after full display of the quote
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000); //Display full quote after 3 seconds
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayedQuote((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, 50);
    } else if (isDeleting && index === 0) {
      //Restart cycle after fetching a new quote
      setIsDeleting(false);
      fetchQuote();
    }
    return () => clearTimeout(timeout);
  }, [quote, index, isDeleting]);

  return (
    <div className="bg-gray-50 flex items-start justify-center px-4 mt-5 rounded-2xl overflow-hidden min-h-[30px] w-full">
      <div className="scroll-container">
        <p className="text-[#141414] italic text-base whitespace-nowrap">
          {displayedQuote || "Loading..."}
        </p>
      </div>
    </div>
  );
}

export default Quotes;
