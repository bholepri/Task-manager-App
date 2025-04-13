import { Schema } from "mongoose";
import mongoose from "mongoose";

const taskSchema = new Schema({
    username:{
        type: String,
    },
    task:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
})

const Task = mongoose.model("Task", taskSchema);
export default Task;