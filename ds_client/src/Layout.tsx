import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
// import Quotes from "./components/Quotes/Quotes.jsx";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* <ScrollToTop /> */}
      <Header />
      {/* <Quotes /> */}

      <main className="flex-grow w-full px-4 py-4">
        <div className="max-w-full sm:max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;