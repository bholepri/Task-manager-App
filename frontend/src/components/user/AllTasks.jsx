import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const AllTasks = () => {
  const {
    alltasks,
    taskCompleted,
    taskDeleted,
    taskRemove,
    token,
    getAllTasks,
  } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getAllTasks();
    }
  });

  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alltasks.reverse().map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:translate-y-[-10px] transition-all duration-500"
          >
            <div>
              <h1 className="text-indigo-600 font-semibold text-lg mb-2">
                Task {index + 1}
              </h1>
              <h2 className="text-gray-800 font-bold text-xl mb-1">
                {item.task}
              </h2>
              <p className="text-gray-500 text-base">{item.description}</p>
              <p className="text-gray-500 text-sm mt-2 flex justify-end">
                {new Date(item.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              {item.isCompleted ? (
                <p className="text-green-400 mt-4">Completed</p>
              ) : item.isDeleted ? (
                <div className="flex justify-around mt-5">
                  <p className="text-red-400 mt-4">Deleted</p>
                  <button
                    onClick={() => taskRemove(item._id)}
                    className="rounded-2xl text-gray-600  p-1 w-20 mt-3 hover:bg-red-500 hover:text-white border border-gray-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => taskCompleted(item._id)}
                    className="rounded-lg bg-green-400 text-white p-2"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => taskDeleted(item._id)}
                    className="rounded-lg bg-red-400 text-white p-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
