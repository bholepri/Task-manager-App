import userModel from "../models/userModel.js";
import taskModel from "../models/taskModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//API for user registration
const userRegister = async (req, res) => {
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
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Enter valid Email" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for adding task
const addTask = async (req, res) => {
  const { task, description } = req.body;
  const userId = req.userId;

  const user = await userModel.findById(userId).select("name");;
 

  if (!task || !description) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const taskData = {
      task,
      description,
    username:user.name,
    };
    const newTask = new taskModel(taskData);
    const taskAdd = await newTask.save();

    res.json({ success: true, message: "Task Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for getting all tasks of user
const allTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("name");
     const name = user.name;
    const tasks = await taskModel.find( {username:name} );
   
    if (!tasks) {
      return res.json({ success: false, message: "No tasks found" });
    }
    res.json({ success: true, tasks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for marking task as completed
const taskCompleted = async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const task = await taskModel.findByIdAndUpdate(taskId, {
      isCompleted: true,
    });
    res.json({ success: true, message: "Task Completed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to delete task
const taskDeleted = async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const task = await taskModel.findByIdAndUpdate(taskId, { isDeleted: true });
    res.json({ success: true, message: "Task Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to remove task permantley
const taskRemove = async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const task = await taskModel.findByIdAndDelete(taskId);
    res.json({ success: true, message: "Task Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user dashboard data
const userDashboard = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId).select("name");
    const name = user.name;
    const tasks = await taskModel.find({ username:name });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    const deletedTasks = tasks.filter((task) => task.isDeleted).length;

    res.json({ success: true, totalTasks, completedTasks, deletedTasks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  userRegister,
  userLogin,
  addTask,
  allTasks,
  taskCompleted,
  taskDeleted,
  taskRemove,
  userDashboard,
};
