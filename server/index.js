import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./routes/user.js"; // Import your user router
import scoreRouter from "./routes/Scores.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/auth", UserRouter); // Mount UserRouter under /auth
app.use("/auth", scoreRouter); // Mount ScoreRouter under /auth

// Error handling middleware (should come after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Start Server only after MongoDB connection is established
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
