import express from "express";
import { adminRegister , adminLogin,getAllUsers,getAllTasks  ,adminDashboard   } from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js"

const adminRouter = express.Router();

//Route for register and login admin
adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);

//Route for getting all users and tasks
adminRouter.get("/all-users",authAdmin, getAllUsers);
adminRouter.get("/all-tasks",authAdmin, getAllTasks);

//Route for getting admin dashboard data
adminRouter.get("/admin-dashboard",authAdmin, adminDashboard);

export default adminRouter;