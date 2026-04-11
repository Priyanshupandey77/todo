// import express from "express";
// import cors from "cors";

// import todoRoutes from "./routes/todoRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import errorHandler from "./middleware/errorMiddleware.js";

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin:
//       "https://todo-i7laxfiku-priyanshu-pandeys-projects-2ff55de8.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }),
// );

// const corsOptions = {
//   origin:
//     "https://todo-i7laxfiku-priyanshu-pandeys-projects-2ff55de8.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Routes
// app.use("/api/todos", todoRoutes);
// app.use("/api/auth", authRoutes);

// app.use(errorHandler);

// export default app;

import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

/**
 * ✅ Allowed origins (IMPORTANT)
 * Add all stable frontend URLs here
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-xi-drab.vercel.app", // <-- YOUR MAIN VERCEL FRONTEND
];

/**
 * ✅ CORS CONFIG
 */
const corsOptions = {
  origin: function (origin, callback) {
    // allow tools like Postman or server-to-server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked CORS request from:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight requests (IMPORTANT)
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());

/**
 * Test route
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * API Routes
 */
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

/**
 * Error handler (must be last)
 */
app.use(errorHandler);

export default app;
