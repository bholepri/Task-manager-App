import express from "express";
import {userRegister,userLogin,addTask,allTasks,taskCompleted,taskDeleted,taskRemove,userDashboard,} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

//Route for register and login user
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

//Route for adding task and getting all tasks
userRouter.post("/add-task", authUser, addTask);
userRouter.get("/all-tasks", authUser, allTasks);

//Route for completing, deleting and removing task
userRouter.post("/task-complete", taskCompleted);
userRouter.post("/task-delete", taskDeleted);
userRouter.post("/task-remove",  taskRemove);

//Route for getting user dashboard data
userRouter.get("/user-dashboard", authUser, userDashboard);

export default userRouter;
