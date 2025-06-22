import React, { useEffect, useState, FormEvent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import SoftDev from "../Images/SoftDev.jpg";

interface OutletContextType {
  user: {
    id: number;
    username: string;
    fullname: string;
  } | null;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

const AdminLoginForm = () => {
  //   const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshPage, setRefreshPage] = useState<boolean>(false);
  const navigate = useNavigate();
  // const {onLogin} = useOutletContext();
  const { onLogin, user } = useOutletContext<OutletContextType>();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
        console.log(users);
      });
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formik.values.username,
        password: formik.values.password,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Both username and password are required.");
        }
        if (!response.ok) {
          throw new Error("Invalid username or password.");
        }
        alert("Login was successful");
        return response.json();
      })

      .then((data) => {
        const user = data.subscriber;
        console.log("Logged in user :" + user.username);
        onLogin(user); // Pass only subscriber object
        console.log("User data ->" + user.fullname);
        navigate("/home");
      })

      .catch((error: Error) => {
        setError(error.message);
      });
  }

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded overflow-hidden shadow-md px-6 py-4 bg-white w-full max-w-xl">

        {/* Logo */}
      {/* <div className="flex justify-center mb-4">
        <img src={SoftDev} alt="App Logo" className="h-16 w-16 object-contain" />
      </div> */}

        <div className="bg-gray-200 py-1 border rounded-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 mt-2">
            Real Estate App
            <hr
              className="border-t-2 border-red-700 mb-1 py-1"
              style={{ width: "15%", margin: "10px auto" }}
            />
          </h2>
        </div>

        <div className="bg-gray-100 py-4 mt-4 flex justify-center items-center border rounded-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="py-6 font-bold text-2xl text-center">
              Login to get started...
            </div>
            <div className="form-group flex items-center mb-4">
              <label htmlFor="username" className="form-label mr-4 w-32 text-left ml-5">
                Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="flex-grow border border-gray-300 rounded-md p-2 -ml-6 mr-4"
              />
            </div>
            <p className="error-message text-red-500 ml-32">
              {formik.errors.username}
            </p>

            <div className="form-group flex items-center mb-4">
              <label htmlFor="password" className="form-label mr-4 w-32 text-left ml-5">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="flex-grow border border-gray-300 rounded-md p-2 -ml-6 mr-4"
              />
            </div>
            <p className="error-message text-red-500 ml-32">
              {formik.errors.password}
            </p>

            {error && <p className="error-message text-red-500 text-center">{error}</p>}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
            <div className="py-4 text-center">
              Forgot password?{" "}
              <Link to="/resetpassword">
                <strong>Reset Password</strong>
              </Link>
            </div>
            {/* <div>
              Don't have an account?{" "}
              <Link to="/signup">
                <strong>Sign Up</strong>
              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminLoginForm;
