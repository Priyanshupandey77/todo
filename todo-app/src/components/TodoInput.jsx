import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoInput() {
  const [input, setInput] = useState("");
  const { addTodo } = useTodos();

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    addTodo(input.trim());
    setInput("");
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
