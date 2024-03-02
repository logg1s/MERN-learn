import InputTodo from "./components/InputTodo/InputTodo";
import TodoItem from "./components/TodoItem/TodoItem";
import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "Take out the trash",
      completed: true,
    },
    {
      id: 2,
      title: "Dinner",
      completed: false,
    },
    {
      id: 3,
      title: "Meeting with boss",
      completed: false,
    },
  ]);

  const handleToggle = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div className="container">
      <h1>Simple Todo List</h1>
      <InputTodo />
      <TodoItem data={todoList} onToggle={handleToggle} />
    </div>
  );
}

export default App;
