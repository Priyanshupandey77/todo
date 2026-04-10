import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://todo-xi-drab.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
