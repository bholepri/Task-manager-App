import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";

const Sidebar = () => {
  const { token } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className=" bg-white border-r border-gray-200 hidden md:block h-screen ">
      {/* user sidebar */}
      {token && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 font-semibold border-[#5F6FFF]"
                  : ""
              }`
            }
            to={"/user-dashboard"}
          >
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 font-semibold border-[#5F6FFF]"
                  : ""
              }`
            }
            to={"/all-tasks"}
          >
            <p className="hidden md:block">All Tasks</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 font-semibold border-[#5F6FFF]"
                  : ""
              }`
            }
            to={"/add-task"}
          >
            <p className="hidden md:block">Add Task</p>
          </NavLink>
        </ul>
      )}
      {/* admin sidebar */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 font-semibold border-[#5F6FFF]"
                  : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 font-semibold border-[#5F6FFF]"
                  : ""
              }`
            }
            to={"/admin-all-tasks"}
          >
            <p className="hidden md:block">All Tasks</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] border-r-4 font-semibold border-[#5F6FFF]"
                  : ""
              }`
            }
            to={"/all-users"}
          >
            <p className="hidden md:block">All Users</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
