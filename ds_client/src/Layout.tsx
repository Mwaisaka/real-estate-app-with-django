import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.tsx";
// import Quotes from "./components/Quotes/Quotes.jsx";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/"; // Hide on AdminLoginForm route
  return (
    <div className="flex flex-col min-h-screen w-full dark:bg-gray-800">
      <ScrollToTop />

      {/* <Header /> */}
      {!hideHeaderFooter && <Header />}
      {/* <Quotes /> */}

      <main className="flex-grow w-full px-4 py-4">
        <div className="max-w-full sm:max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* <Footer /> */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;
