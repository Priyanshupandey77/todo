import express from "express";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
} from "../controllers/todoController.js";


const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/completed", deleteCompletedTodos);
router.delete("/:id", deleteTodo);


export default router;