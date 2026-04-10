import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
// ✅ CORS FIRST
app.use(
  cors({
    origin: "https://todo-xi-drab.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ✅ Handle preflight requests
app.options("*", cors());

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
