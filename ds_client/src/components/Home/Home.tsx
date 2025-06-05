import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.tsx";
import Content from "./Content.tsx";
import { useOutletContext , useNavigate} from "react-router-dom";
import "./dashboard.css";

interface OutletContextType {
  user: {
    id: number;
    username: string;
    fullname: string;
  } | null;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}
const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Keep sidebar open by default on larger screens
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const {user, onLogout, onLogin} = useOutletContext();
  const { user, onLogin, onLogout } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log("Home component - user:", user);
  }, [user]);

  // Detect window resize to update `isMobile`
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setMobileMenuOpen((prev) => !prev); // Sync sidebar with mobile menu toggle
  };

  // Close sidebar when clicking a menu item (only on mobile)
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (isMobile) {
      setIsSidebarOpen(false);
      setMobileMenuOpen(false);
    }
  };

  if (user) {
    return (
      <div className="dashboard-container mt-5">
        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="mobile-menu-button">
            <button
              onClick={toggleSidebar}
              type="button"
              className="mobile-toggle-btn"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              ☰ {/* Mobile menu icon */}
            </button>
          </div>
        )}

        {/* Main Dashboard Layout */}
        <div className="dashboard">
          {/* Sidebar (Visible unless toggled off on mobile) */}
          <div
            className={`sidebar ${
              isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
          >
            <Sidebar
              onLogout={onLogout}
              onMenuItemClick={handleMenuItemClick}
            />
          </div>

          {/* Main Content */}
          <div
            className={`dashboard--content ${
              isSidebarOpen ? "content-expanded" : "content-full"
            } mt-2`}
          >
            <Content title={selectedMenuItem} onLogin={onLogin} user={user} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <h1 className="text-center mt-10 text-xl">
       <a href="/" className="text-blue-700">User not logged in! Click here to log in...</a>
    </h1>
  );
};

export default Home;
