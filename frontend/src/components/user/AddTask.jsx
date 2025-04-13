import React, { useContext } from "react";
import axios, { Axios } from "axios";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const AddTask = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const addTask = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      backendUrl + "/api/user/add-task",
      { task, description },
      { headers: { token } }
    );
    if (data.success) {
      toast.success(data.message);
      setTask("");
      setDescription("");
      navigate("/all-tasks");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="sm:ms-20 sm:mt-10">
      <h1 className="text-gray-700 font-bold text-2xl mt-5 text-center">
        {" "}
        Add Task Here:
      </h1>
      <div className="border border-gray-300 mt-8 rounded shadow-lg lg:w-130 h-100  md:ms-10 p-10">
        <form className="flex flex-col gap-8   p-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="taskName">Task Name:</label>
            <input
              onChange={(e) => setTask(e.target.value)}
              value={task}
              className="border p-3 border-gray-600 rounded"
              type="text"
              id="taskName"
              name="taskName"
              required
              placeholder="Enter Your Task"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="taskDescription">Task Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="border p-3 border-gray-600 rounded"
              id="taskDescription"
              name="taskDescription"
              required
              placeholder="Enter Description of Your Task"
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={addTask}
              className="p-2 w-36 rounded-lg border   border-gray-400 hover:bg-[#5F6FFF] hover:text-white"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
