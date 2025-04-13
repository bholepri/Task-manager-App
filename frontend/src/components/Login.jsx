import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const [state, setState] = useState("Login");
  const [user, setUser] = useState("User");

  const { token, setToken } = useContext(AppContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          toast.success("Account Created");
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        if (user === "Admin") {
          const { data } = await axios.post(backendUrl + "/api/admin/login", {
            password,
            email,
          });
          if (data.success) {
            toast.success(" Admin Logged In");
            console.log(data);
            localStorage.setItem("aToken", data.token);
            setAToken(data.token);
            navigate("/admin-dashboard");
          }
        } else {
          const { data } = await axios.post(backendUrl + "/api/user/login", {
            password,
            email,
          });
          if (data.success) {
            toast.success("Logged In");
            localStorage.setItem("token", data.token);

            setToken(data.token);
          } else {
            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/add-task");
    }
  }, [token]);

  useEffect(() => {
    if (user === "User") {
      setEmail("John@gmail.com");
      setPassword("John1234");
    }
  }, [user]);

  useEffect(() => {
    if (user === "Admin") {
      setEmail("admin@gmail.com");
      setPassword("admin123");
    }
  }, [user]);

  return (
    !token && (
      <div className="flex justify-center h-screen w-screen">
        <form onSubmit={handleSubmit} className=" flex flex-col mt-10">
          <p className="text-2xl font-semibold text-center mb-5">
            <span className="text-[#5F6FFF]">{user}</span>{" "}
          </p>

          <div className="flex flex-col gap-3  items-start p-6  sm:min-w-96 border border-gray-200 rounded-xl  text-zinc-600 text-sm shadow-lg">
            <p className="text-2xl font-semibold">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </p>
            <p>
              Please {state === "Sign Up" ? "sign up" : "login"} to Add Task
            </p>
            {state === "Sign Up" && (
              <div className="w-full">
                <p>Full Name:</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div className="w-full">
              <p>Email:</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="w-full">
              <p>Password:</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#5F6FFF] mt-2 text-white w-full py-2 rounded-md text-base"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
            <p>
              {state === "Sign Up" ? (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-[#5F6FFF] underline cursor-pointer"
                  >
                    Login here
                  </span>{" "}
                </p>
              ) : user === "Admin" ? (
                ""
              ) : (
                <p>
                  Create an new account?{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-[#5F6FFF] underline cursor-pointer"
                  >
                    Click here
                  </span>
                </p>
              )}
            </p>
          </div>
          {user === "User" ? (
            <p className="mt-5 text-center text-zinc-600 text-sm">
              Admin Login?{" "}
              <span
                className="text-[#5F6FFF] cursor-pointer underline"
                onClick={() => setUser("Admin")}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p className="mt-5 text-center text-zinc-600 text-sm">
              User Login?{" "}
              <span
                className="text-[#5F6FFF] cursor-pointer underline"
                onClick={() => setUser("User")}
              >
                Click Here
              </span>
            </p>
          )}
        </form>
      </div>
    )
  );
};

export default Login;
