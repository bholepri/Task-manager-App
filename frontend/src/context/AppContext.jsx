import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [token, _setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [alltasks, setAllTasks] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    _setToken(newToken);
  };

  //get all tasks of user
  const getAllTasks = async () => {
    const { data } = await axios.get(backendUrl + "/api/user/all-tasks", {
      headers: { token },
    });

    if (data.success) {
      setAllTasks(data.tasks);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    console.log(alltasks);
  };

  //mark task completed
  const taskCompleted = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/task-complete",
        { taskId: id }
      );

      if (data.success) {
        getAllTasks();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //mark task deleted
  const taskDeleted = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/task-delete", {
        taskId: id,
      });

      if (data.success) {
        getAllTasks();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //mark task removed
  const taskRemove = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/task-remove", {
        taskId: id,
      });

      if (data.success) {
        getAllTasks();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getAllTasks();
    }
  }, [token]);

  const value = {
    token,
    setToken,
    backendUrl,
    getAllTasks,
    alltasks,

    setAllTasks,
    taskCompleted,
    taskDeleted,
    taskRemove,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
