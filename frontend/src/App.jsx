import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import Login from "./components/Login";
import UserDashboard from "./components/user/UserDashboard";
import AllTasks from "./components/user/AllTasks";
import AddTask from "./components/user/AddTask";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminAllTasks from "./components/admin/AdminAllTasks";
import AllUsers from "./components/admin/AllUsers";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />

          {/* user routes */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/add-task" element={<AddTask />} />

          {/* admin routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-all-tasks" element={<AdminAllTasks />} />
          <Route path="/all-users" element={<AllUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
