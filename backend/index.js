import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);


// First Connect to MongoDB then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});