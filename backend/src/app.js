import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

export default app;
