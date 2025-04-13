import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AllUsers = () => {
  const { aToken } = useContext(AdminContext);
  const { backendUrl } = useContext(AppContext);

  const [allUsers, setAllUsers] = useState([]);

  const getAllusers = async () => {
    const { data } = await axios.get(backendUrl + "/api/admin/all-users", {
      headers: { aToken },
    });
    if (data.success) {
      toast.success(data.message);
      setAllUsers(data.users);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllusers();
    }
  });

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col gap-6">
        {[...allUsers].reverse().map((item, index) => (
          <div
            key={index}
            className="sm:w-1/2 sm:ms-10 sm:mt-5 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="sm:flex sm:flex-row gap-10 items-center ">
              <h1 className="text-indigo-600 font-semibold text-lg mb-2">
                {index + 1}
              </h1>
              <h2 className="text-gray-600 font-bold mb-1">{item.name}</h2>
              <p className="text-gray-500 text-base">{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
