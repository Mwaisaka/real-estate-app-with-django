// import React, { useState, useEffect } from "react";
// import "./Quotes.css"; // Import the CSS file for styling

// function Quotes() {
//   const [quote, setQuote] = useState(""); // Use state to store the quote
//   const api_url =
//     "https://portfolio-website-qtg9.onrender.com/api/random_quote/";
//   const [displayedQuote, setDisplayedQuote] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     fetchQuote();
//   }, []);

//   async function fetchQuote() {
//     try {
//       const response = await fetch(api_url);
//       const data = await response.json();
//       setQuote(data.quote);
//     } catch (error) {
//       console.error("Error fetching quote:", error);
//     }
//   }

//   useEffect(() => {
//     let timeout;
//     if (!quote) return;

//     if (!isDeleting && index < quote.length) {
//       timeout = setTimeout(() => {
//         setDisplayedQuote((prev) => prev + quote.charAt(index));
//         setIndex((prev) => prev + 1);
//       }, 100);
//     } else if (!isDeleting && index === quote.length) {
//       //Pause after full display of the quote
//       timeout = setTimeout(() => {
//         setIsDeleting(true);
//       }, 3000); //Display full quote after 3 seconds
//     } else if (isDeleting && index > 0) {
//       timeout = setTimeout(() => {
//         setDisplayedQuote((prev) => prev.slice(0, -1));
//         setIndex((prev) => prev - 1);
//       }, 50);
//     } else if (isDeleting && index === 0) {
//       //Restart cycle after fetching a new quote
//       setIsDeleting(false);
//       fetchQuote();
//     }
//     return () => clearTimeout(timeout);
//   }, [quote, index, isDeleting]);

//   return (
//     <div className="bg-gray-50 flex items-start justify-center px-4 mt-5 rounded-2xl overflow-hidden min-h-[30px] w-full">
//       <div className="scroll-container">
//         <p className="text-[#141414] italic text-base whitespace-nowrap">
//           {displayedQuote || "Loading..."}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Quotes;

import React, { useState, useEffect } from "react";

function Quotes() {
  const [quote, setQuote] = useState("");
  const [duration, setDuration] = useState(10);
  const api_url =
    "https://portfolio-website-qtg9.onrender.com/api/random_quote/";

  // Fetch a random quote from the API
  async function fetchQuote() {
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      const newQuote = data.quote;
      setQuote(newQuote);

      // adjust scroll speed based on length
      const length = newQuote.length;
      const baseSpeed = 8; // minimum duration (short quotes)
      const extra = Math.min(length / 10, 20); // cap at +20s
      setDuration(baseSpeed + extra);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Oops! Something went wrong while fetching the quote.");
      setDuration(10);
    }
  }
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 15000); // fetch a new quote every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full bg-gray-50 rounded-2xl mt-5 p-2 h-10">
      <div
        className="absolute whitespace-nowrap animate-scroll hover:pause"
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        <p className="text-[#141414] italic text-base">
          {quote || "Loading..."}
        </p>
      </div>
    </div>
  );
}

export default Quotes;
