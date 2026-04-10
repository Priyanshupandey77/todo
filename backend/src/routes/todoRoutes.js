import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.delete("/completed", protect, deleteCompletedTodos);
router.delete("/:id", protect, deleteTodo);

export default router;
