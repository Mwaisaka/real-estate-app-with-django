import React, { useState, useEffect } from "react";
// import "./Clock.css";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
    }

    const interval = setInterval(updateTime, 1000);
    updateTime(); // Set initial time immediately

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="clock">
      <div className="digital-clock">{time}</div>
    </div>
  );
}

export default Clock;