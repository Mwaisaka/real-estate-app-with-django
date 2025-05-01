import { useEffect, useState } from "react";

export default function Toggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="m-4 px-4 py-0 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      {/* Add your routes/outlet here */}
    </div>
  );
}
