import Todo from "../models/Todo.js";

//GET ALL TODOS
export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

//CREATE
export const createTodo = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is requierd" });
  }

  const newTodo = await Todo.create({ text });

  res.status(201).json(newTodo);
};

//UPDATE TODO
export const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { text, completed } = req.body;

  const updated = await Todo.findByIdAndUpdate(
    id,
    {
      ...(text !== undefined && { text }),
      ...(completed !== undefined && { completed }),
    },
    { new: true },
  );
  res.json(updated);
};

//DELETE todo
export const deleteTodo = async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id);

  res.json({ message: "Todo deleted" });
};

//DELETE completed todos
export const deleteCompletedTodos = async (req, res) => {
  await Todo.deleteMany({ completed: true });

  res.json({ message: "Completed todos deleted" });
};
