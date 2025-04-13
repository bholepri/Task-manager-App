import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAllTasks = () => {
  const { aToken } = useContext(AdminContext);
  const { backendUrl } = useContext(AppContext);

  const [allTasks, setAllTasks] = useState([]);
  console.log(allTasks);

  const getAllTasks = async () => {
    const { data } = await axios.get(backendUrl + "/api/admin/all-tasks", {
      headers: { aToken },
    });
    if (data.success) {
      setAllTasks(data.tasks);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllTasks();
    }
  }, [aToken]);

  return (
    <div className="w-full px-4 py-6">
      <div className="sm:grid sm:grid-cols-6  hidden  items-center text-xl font-bold text-gray-600 mb-4">
        <h1>Tasks</h1>
        <h1>User</h1>
        <h1>Title</h1>
        <h1>Description</h1>
        <h1>Date</h1>
        <h1>Action</h1>
      </div>
      <div className="flex flex-col gap-6">
        {[...allTasks].reverse().map((item, index) => (
          <div
            key={index}
            className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="grid sm:grid-cols-6 grid-cols-1 items-center">
              <h1 className="text-indigo-600 font-semibold text-lg mb-2">
                {index + 1}
              </h1>
              <h2 className="text-gray-500 mb-1">{item.username}</h2>
              <h2 className="text-gray-500  mb-1">{item.task}</h2>
              <p className="text-gray-500 text-base">{item.description}</p>
              <p className="text-gray-500 text-sm mt-2 ">
                {new Date(item.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {item.isCompleted ? (
                <p className="text-green-600">Completed</p>
              ) : item.isDeleted ? (
                <p className="text-red-500">Deleted</p>
              ) : (
                <p className="text-yellow-400"> Pending</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllTasks;
