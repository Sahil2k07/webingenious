import mongoose from "mongoose";

const task = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "Pending",
    required: true,
    enum: ["pending", "in-progress", "completed"],
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

export default mongoose.model("Task", task);
