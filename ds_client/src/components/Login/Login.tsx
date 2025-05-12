import React, { useEffect, useState, FormEvent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  // Add other user fields as necessary
}

interface LoginResponse {
  // Adjust this based on your backend's login response
  username: string;
  token?: string;
  [key: string]: any;
}

interface AdminLoginFormProps {
  onLogin: (user: LoginResponse) => void;
  user: User | null;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onLogin, user }) => {
  //   const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshPage, setRefreshPage] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((users: User[]) => {
        setUsers(users);
        console.log(users);
      });
  }, [refreshPage]);

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
        return response.json();
      })
      .then((user: LoginResponse) => {
        onLogin(user);
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
    <div className="pt-1 py-2">
      <div
        className="rounded overflow-hidden shadow-none px-6 py-2"
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          width: "100%",
        }}
      >
        <div className="bg-gray-500 py-1">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 mt-2">
            Real Estate Management App
            <hr
              className="border-t-2 border-red-700 mb-1 py-1"
              style={{ width: "15%", margin: "10px auto" }}
            />
          </h2>
        </div>

        <div
          className="bg-gray-100 py-4 mt-8"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ margin: "20px", width: "50%", height: "auto" }}
          >
            <div className="py-6 font-bold text-2xl">
              Please login to get started...
            </div>
            <div className="form-group flex items-center mb-4">
              <label htmlFor="username" className="form-label mr-4 text-left ">
                Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Please enter your username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <p className="error-message text-red-500">
              {formik.errors.username}
            </p>

            <div className="form-group flex items-center mb-4">
              <label htmlFor="password" className="form-label mr-6 text-left">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Please enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full border border-gray-300 rounded-md p-2.5"
              />
            </div>
            <p className="error-message text-red-500">
              {formik.errors.password}
            </p>

            {error && <p className="error-message text-red-500">{error}</p>}
            <div className="button-group">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
            <div className="py-4">
              Forgot password?{" "}
              <Link to="/resetpassword">
                <strong>Reset Password</strong>
              </Link>
            </div>
            <div>
              Don't have an account?{" "}
              <Link to="/signup">
                <strong>Sign Up</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminLoginForm;
