import express from "express";
import cors from "cors";
import connectMongodb from "./config/mongo";
import taskRoutes from "./modules/task/task.routes";
import errorHandler from "./middlewares/errorHandler";

connectMongodb().then(() => console.log("Database connected"));

const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "*",
  }),
);

server.use("/tasks", taskRoutes);

server.use(errorHandler);

server.listen(3000, () => {
  console.log("Server is running...");
});
