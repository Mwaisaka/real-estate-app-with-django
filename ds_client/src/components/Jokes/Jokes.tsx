// import React, { useState, useEffect } from "react";
// // import "./Quotes.css"; // Import the CSS file for styling

// function Jokes() {
//   const [joke, setJoke] = useState(""); // Use state to store the joke
//   const api_url = "https://v2.jokeapi.dev/joke/Any";
//   const [displayedJoke, setDisplayedJoke] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [index, setIndex] = useState(0);

//   // Fetch a random joke from the API
//   async function fetchJoke() {
//     try {
//       const response = await fetch(api_url);
//       const data = await response.json();

//       let jokeText = "";
//       if (data.type === "single") {
//         jokeText = data.joke;
//       }
//       else if (data.type === "twopart") {
//         jokeText = `${data.setup} - ${data.delivery}`;
//       }
//       else {
//         jokeText = "Unexpected joke format.";
//       }
//       setJoke(jokeText);
//       setDisplayedJoke(""); // Reset animation
//       setIndex(0);
//     } catch (error) {
//       console.error("Error fetching joke:", error);
//       setJoke("Oops! Something went wrong while fetching the joke.")
//     }
//   }

//   useEffect(() => {
//     fetchJoke();
//   }, []);

//   useEffect(() => {
//     let timeout : ReturnType<typeof setTimeout>
//     if (!joke) return;

//     if (!isDeleting && index < joke.length) {
//       timeout = setTimeout(() => {
//         setDisplayedJoke((prev) => prev + joke.charAt(index));
//         setIndex((prev) => prev + 1);
//       }, 50);
//     } else if (!isDeleting && index === joke.length) {
//       //Pause after full display of the joke
//       timeout = setTimeout(() => {
//         setIsDeleting(true);
//       }, 3000); //Display full joke after 3 seconds
//     } else if (isDeleting && index > 0) {
//       timeout = setTimeout(() => {
//         setDisplayedJoke((prev) => prev.slice(0, -1));
//         setIndex((prev) => prev - 1);
//       }, 50);
//     } else if (isDeleting && index === 0) {
//       //Restart cycle after fetching a new quote
//       setIsDeleting(false);
//       fetchJoke();
//     }
//     return () => clearTimeout(timeout);
//   }, [joke, index, isDeleting]);

//   return (
//     <div className="bg-gray-50 flex items-start justify-center px-4 mt-5 rounded-2xl overflow-hidden min-h-[30px] w-full">
//       <div className="scroll-container">
//         <p className="text-[#141414] italic text-base break-words whitespace-normal">
//           {displayedJoke || "Loading..."}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Jokes;

import React, { useState, useEffect } from "react";

function Jokes() {
  const [joke, setJoke] = useState("");
  const api_url = "https://v2.jokeapi.dev/joke/Any";

  // Fetch a random joke from the API
  async function fetchJoke() {
    try {
      const response = await fetch(api_url);
      const data = await response.json();

      let jokeText = "";
      if (data.type === "single") {
        jokeText = data.joke;
      } else if (data.type === "twopart") {
        jokeText = `${data.setup} - ${data.delivery}`;
      } else {
        jokeText = "Unexpected joke format.";
      }
      setJoke(jokeText);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Oops! Something went wrong while fetching the joke.");
    }
  }

  useEffect(() => {
    fetchJoke();
    const interval = setInterval(fetchJoke, 15000); // fetch a new joke every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full bg-gray-50 rounded-2xl mt-5 p-2 h-10">
      <p className="absolute whitespace-nowrap text-[#141414] italic text-base animate-scroll">
        {joke || "Loading..."}
      </p>
    </div>
  );
}

export default Jokes;
