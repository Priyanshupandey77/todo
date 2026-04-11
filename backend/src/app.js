import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// ✅ CORS (FINAL WORKING CONFIG)
const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-xi-drab.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// ✅ VERY IMPORTANT (handles preflight properly)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Middleware
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// ✅ Error handler (always last)
app.use(errorHandler);

export default app;
