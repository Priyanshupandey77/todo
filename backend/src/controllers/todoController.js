import mongoose from "mongoose";
import Todo from "../models/Todo.js";

//GET ALL TODOS
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

//CREATE
export const createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is requierd" });
    }

    const newTodo = await Todo.create({ text, user: req.user._id });

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

//UPDATE TODO
export const updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { text, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Todo.findByIdAndUpdate(
      id,
      {
        ...(text !== undefined && { text }),
        ...(completed !== undefined && { completed }),
      },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

//DELETE todo
export const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await todo.deleteOne();

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//DELETE completed todos
export const deleteCompletedTodos = async (req, res, next) => {
  try {
    await Todo.deleteMany({ completed: true, user: req.user._id });
    res.json({ message: "Completed todos deleted" });
  } catch (error) {
    next(error);
  }
};
