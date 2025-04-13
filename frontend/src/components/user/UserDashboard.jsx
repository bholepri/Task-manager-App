import React, { useContext, useEffect ,useState} from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserDashboard = () => {
  const {backendUrl,token}=useContext(AppContext)
  const [userData,setUserData]=useState({})

  const getUserData=async ()=>{
    const {data}=await axios.get(backendUrl+"/api/user/user-dashboard",{headers:{token}})
    //console.log(data)
    if(data.success){
      toast.success(data.message)
      setUserData(data)
    }
    else{
      toast.error(data.message)
    }
  }
  useEffect(()=>{
    getUserData()
  })


  return (
    <div className="flex flex-wrap gap-5 h-1/2 p-10 sm:mt-10 sm:ms-10">
       <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
           
           <p className="text-xl font-semibold text-gray-600">
             {userData.totalTasks}
           </p>
           <p className="text-gray-400">Total Tasks</p>
       
       </div>
          <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            
              <p className="text-xl font-semibold text-gray-600 ">
                {userData.completedTasks}
              </p>
              <p className="text-gray-400 ">Completed Tasks</p>
            
          </div>
          <div className="flex flex-col items-center gap-2 bg-white p-4  min-w-52 rounded  border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            
              <p className="text-xl font-semibold text-gray-600">
                {userData.deletedTasks}
              </p>
              <p className="text-gray-400 ">Deleted tasks</p>
            
          </div>
         
        </div>
  )
}

export default UserDashboard
