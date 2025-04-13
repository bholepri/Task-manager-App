import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { aToken } = useContext(AdminContext);

  const { backendUrl } = useContext(AppContext);

  const [taskData, setTaskData] = useState({});

  const adminDashData = async () => {
    const { data } = await axios.get(
      backendUrl + "/api/admin/admin-dashboard",
      { headers: { aToken } }
    );

    if (data.success) {
      toast.success(data.message);
      setTaskData(data);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      adminDashData();
    }
  }, [aToken]);
  
  return (
    <div>
      <div className="flex flex-wrap gap-5  p-10 sm:mt-10 sm:ms-10">
        <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600">
            {taskData.totalUsers}
          </p>
          <p className="text-gray-400">Total Users</p>
        </div>
        <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600">
            {taskData.totalTasks}
          </p>
          <p className="text-gray-400">Total Tasks</p>
        </div>
        <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600 ">
            {taskData.completedTasks}
          </p>
          <p className="text-gray-400 ">Completed Tasks</p>
        </div>
        <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600">
            {taskData.deletedTasks}
          </p>
          <p className="text-gray-400 ">Deleted tasks</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
