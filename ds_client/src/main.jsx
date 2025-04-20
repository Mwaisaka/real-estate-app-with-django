import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./components/Home/Home.tsx";
import AdminLoginForm from "./components/Login/Login.tsx";
import Layout from "./Layout.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";

function Main() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<AdminLoginForm />} />
        <Route path="/home" element={<Home />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
