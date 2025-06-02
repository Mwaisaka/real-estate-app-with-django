
import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  BiHome,
  BiBookAlt,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
  BiSolidCreditCardFront,
  BiSolidLandmark,
  BiSolidArch,
  BiGroup,
  BiCut,
} from "react-icons/bi";

import "./sidebar.css";
const Sidebar = ({ onLogout, onMenuItemClick }) => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  useEffect(() => {
    // Trigger handleMenuItemClick with "Dashboard" as default selected item
    onMenuItemClick("Dashboard");
  }, []);

  function handleLogout() {
    // Ask the user for confirmation
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      // Proceed with logout
      onLogout();
      alert("You have been logged out successfully");
      navigate("/");
    } else {
      // Do nothing and keep the user on the current page
      return;
    }
  }

  const handleClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    onMenuItemClick(menuItem);
  };

  return (
    <div className="menu mt-5">
      {/* <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h2>Dashboard Overview</h2>
      </div> */}
      <div className="menu--list">
        {/* <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a> */}
        <div
          className={`item ${activeMenuItem === "Dashboard" ? "active" : ""}`}
          onClick={() => handleClick("Dashboard")}
        >
          <BiHome className="icon" />
          <span>Dashboard Home</span>
        </div>

        <div
          className={`item ${
            activeMenuItem === "UsersList" ? "active" : ""
          }`}
          onClick={() => handleClick("UsersList")}
        >
          <BiGroup className="icon" />
          <span>List of Active Users</span>
        </div>

        <div
          className={`item ${activeMenuItem === "Add Blog" ? "active" : ""}`}
          onClick={() => handleClick("Add Blog")}
        >
          <BiTask className="icon" />
          <span>Add a blog</span>
        </div>
        <div
          className={`item ${
            activeMenuItem === "Manage Blogs" ? "active" : ""
          }`}
          onClick={() => handleClick("Manage Blogs")}
        >
          <BiTask className="icon" />
          <span>Manage Blogs</span>
        </div>

        <div
          className={`item ${
            activeMenuItem === "Manage Messages" ? "active" : ""
          }`}
          onClick={() => handleClick("Manage Messages")}
        >
          <BiTask className="icon" />
          <span>Manage Messages</span>
        </div>

        <div
          className={`item ${
            activeMenuItem === "Profile" ? "active" : ""
          }`}
          onClick={() => handleClick("Profile")}
        >
          <BiTask className="icon" />
          <span>View Profile</span>
        </div>

        <a href="#" className="item">
          <BiHelpCircle className="icon" />
          Help
        </a>
        <>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </>
      </div>
    </div>
  );
};

export default Sidebar;
