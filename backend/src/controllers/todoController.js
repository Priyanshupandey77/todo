let todos = [];

//GET
export const getTodos = (req, res) => {
  res.json(todos);
};

//POST
export const createTodo = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is requierd" });
  }

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

//PUT
export const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const { text, completed } = req.body;

  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        text: text ?? todo.text,
        completed: completed ?? todo.completed,
      };
    }
    return todo;
  });
  res.json({ message: "Todo updated" });
};

//DELETE
export const deleteTodo = (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter((todo) => todo.id !== id);

  res.json({ message: "Todo deleted" });
};

export const deleteCompletedTodos = (req, res) => {
  todos = todos.filter((todo) => !todo.completed);

  res.json({ message: "Completed todos deleted"});
};
