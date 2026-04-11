import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-ck21620oa-priyanshu-pandeys-projects-2ff55de8.vercel.app",
  "https://todo-xi-drab.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false); 
    },
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
