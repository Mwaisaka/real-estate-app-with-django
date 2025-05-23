// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import Home from "./components/Home/Home.tsx";
// import AdminLoginForm from "./components/Login/Login.tsx";
// import Layout from "./Layout.tsx";

// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
//   useNavigate,
// } from "react-router-dom";

// function Main() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route path="/" element={<AdminLoginForm />} />
//         <Route path="/home" element={<Home />} />
//       </Route>
//     )
//   );

//   return (
//     <React.StrictMode>
//       <RouterProvider router={router}></RouterProvider>
//     </React.StrictMode>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<Main />);


import React, {useState} from "react";
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


// Main app component
function Main(): JSX.Element {

  const [user, setUser] = useState(null);
  function handleLogin(user) {
    setUser(user);
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<AdminLoginForm onLogin={handleLogin}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/clock" element={<Clock />} />
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
