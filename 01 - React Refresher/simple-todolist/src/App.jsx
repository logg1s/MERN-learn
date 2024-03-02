import InputTodo from "./components/InputTodo/InputTodo";
import TodoItem from "./components/TodoItem/TodoItem";
import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "di hoc",
      completed: true,
    },
    {
      id: 2,
      title: "di choi",
      completed: false,
    },
    {
      id: 3,
      title: "Di ngu",
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


  const onAddTodo = (newTodo) => {
    setTodoList(prevTodoList => {
      return prevTodoList.concat(newTodo)
    })
  }
  
  console.log(todoList)

  return (
    <div className="container">
      <h1>Simple TodoList</h1>
      <InputTodo onAddTodo={onAddTodo} />
      <TodoItem data={todoList} onToggle={handleToggle} />
    </div>
  );


}

export default App;
