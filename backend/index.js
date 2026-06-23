import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
dotenv.config();

const PORT = process.env.PORT;
const ORIGIN = process.env.FRONTEND_URL;

const app = express();

//cors middleware
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.json({
    message: `Welcome to the Task Manager Backend, Backend is running on ${PORT}.`,
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// First Connect to MongoDB then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});