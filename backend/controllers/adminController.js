import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";

//API to register Admin
const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter Strong Password" });
    }
    try {
      const adminExists = await adminModel.findOne({ email });
      if (adminExists) {
        return res.json({ success: false, message: "Admin Already Exists" });
      }
  
      //hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const adminData = await adminModel.create({
        name,
        email,
        password: hashedPassword,
      });
  
      const newAdmin = new adminModel(adminData);
      const admin = await newAdmin.save();
  
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};

//API for user login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Enter valid Email" });
  }
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Admin Not Found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get admin- dashboard data
const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments({});
    const totalTasks = await taskModel.countDocuments({});
    const completedTasks = await taskModel.countDocuments({
      isCompleted: true,
    });
    const deletedTasks = await taskModel.countDocuments({
      isDeleted: true,
    });
    res.json({
      success: true,
      totalUsers,
      totalTasks,
      completedTasks,
      deletedTasks,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all users  
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all tasks  
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.json({ success: true, tasks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { adminRegister, adminLogin,getAllTasks,adminDashboard,getAllUsers };
