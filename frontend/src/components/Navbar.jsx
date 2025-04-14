import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { token, setToken } = useContext(AppContext);
  const {aToken ,setAToken} = useContext(AdminContext)

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    setShowMenu(false)
    token && setToken("");
    token && localStorage.removeItem("token");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    
      <div>
        {/* Top bar */}
        {(token || aToken) && (
          <div className="flex justify-between items-center bg-white border-b border-gray-200 p-4">
            <h1 className="text-2xl font-bold text-gray-700">Task Management</h1>
  
            {/* Desktop Logout */}
            <div className="hidden md:block">
              <button
                onClick={logout}
                className="px-4 py-2 rounded-3xl bg-[#5F6FFF] text-white"
              >
                Logout
              </button>
            </div>
  
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMenu(true)}
                className="text-3xl text-gray-700 focus:outline-none"
              >
                ☰
              </button>
            </div>
          </div>
        )}
  
        {/* Mobile Menu Backdrop */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setShowMenu(false)}
          ></div>
        )}
  
       {/* Mobile Slide-in Menu */}
       <div
  className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-sm bg-white shadow-md transform transition-transform duration-300 ease-in-out md:hidden ${
    showMenu ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex items-center justify-between px-5 py-4 border-b">
    <span className="text-xl font-semibold">
      {aToken ? "Admin Menu" : "User Menu"}
    </span>
    <button onClick={() => setShowMenu(false)} className="text-2xl">
      ✕
    </button>
  </div>

  <ul className="flex flex-col items-start gap-4 mt-6 px-5 text-lg font-medium">
    {token && (
      <>
        <NavLink onClick={() => setShowMenu(false)} to="/user-dashboard">
          <p className="px-4 py-2 rounded hover:bg-gray-100">Dashboard</p>
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/add-task">
          <p className="px-4 py-2 rounded hover:bg-gray-100">Add Task</p>
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/all-tasks">
          <p className="px-4 py-2 rounded hover:bg-gray-100">All Tasks</p>
        </NavLink>
      </>
    )}

    {aToken && (
      <>
        <NavLink onClick={() => setShowMenu(false)} to="/admin-dashboard">
          <p className="px-4 py-2 rounded hover:bg-gray-100">Dashboard</p>
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/all-tasks">
          <p className="px-4 py-2 rounded hover:bg-gray-100">All Tasks</p>
        </NavLink>
        <NavLink onClick={() => setShowMenu(false)} to="/all-users">
          <p className="px-4 py-2 rounded hover:bg-gray-100">All Users</p>
        </NavLink>
      </>
    )}

    {/* Logout for both */}
    {(token || aToken) && (
      <button
        onClick={logout}
        className="px-4 py-2 rounded hover:bg-red-100 text-red-500 w-full text-left mt-4"
      >
        Logout
      </button>
    )}
  </ul>
</div>
      </div>
  
  );
};

export default Navbar;
