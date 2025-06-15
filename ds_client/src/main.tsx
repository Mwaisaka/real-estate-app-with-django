import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./components/Home/Home";
import AdminLoginForm from "./components/Login/Login";
import Layout from "./Layout";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Clock from "./components/Clock/Clock";
import ManageTenants from "./components/Home/ManageTenants";
import RentPayments from "./components/Home/RentPayments";
import TenantStatement from "./components/Home/TenantStatement";

// Main app component
function Main(): JSX.Element {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData); // userData will now be { id, username, fullname }
    console.log("User logged in successfully:", userData.fullname);
  }

  function handleLogout() {    
    console.log("User logged out successfully");
    // setUser(null);    
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout user={user} onLogin={handleLogin} onLogout={handleLogout} />
        }
      >
        <Route path="/" element={<AdminLoginForm />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/clock" element={<Clock />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage_tenants" element={<ManageTenants />}/>
        <Route path="/rent_payments" element={<RentPayments />} />
        <Route path="/tenant_statement" element={<TenantStatement />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// Type-safe root element access
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Main />);
} else {
  throw new Error("Root element not found");
}
