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
 * ✅ 1. Allowed Origins (stable only)
 * IMPORTANT: keep ONLY your main frontend URL here
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-xi-drab.vercel.app",
];

/**
 * ✅ 2. CORS CONFIG (production safe)
 */
const corsOptions = {
  origin: function (origin, callback) {
    // allow Postman / server-to-server
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

/**
 * ✅ 3. Apply CORS globally
 */
app.use(cors(corsOptions));

/**
 * ✅ 4. IMPORTANT: Preflight must use SAME config
 */
app.options(/.*/, cors(corsOptions));

/**
 * ✅ 5. Body parser
 */
app.use(express.json());

/**
 * ✅ 6. Test route
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * ✅ 7. Routes
 */
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

/**
 * ✅ 8. Error handler (must be last)
 */
app.use(errorHandler);

export default app;