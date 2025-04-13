import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const { token, setToken } = useContext(AppContext);
  const {aToken ,setAToken} = useContext(AdminContext)

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    token && setToken("");
    token && localStorage.removeItem("token");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div>
      {(token || aToken) &&<div className="flex justify-between items-center bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold  text-gray-700">Task Management</h1>

        <button
          onClick={logout}
          className="p-1 rounded-3xl w-30  bg-[#5F6FFF] text-white "
        >
          Logout
        </button>
      </div>}
    </div>
  );
};

export default Navbar;
