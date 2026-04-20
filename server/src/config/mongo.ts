import mongoose from "mongoose";

async function connectMongodb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
  } catch (error) {
    console.error("Cannot reach the database");
  }
}

export default connectMongodb;
