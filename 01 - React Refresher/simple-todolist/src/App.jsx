import InputTodo from "./components/InputTodo/InputTodo";
import TodoItem from "./components/TodoItem/TodoItem";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos != null) {
      return JSON.parse(savedTodos);
    } else {
      return [
        {
          id: 'td1',
          title: "di hoc",
          completed: true,
        },
        {
          id: 'td2',
          title: "di choi",
          completed: false,
        },
        {
          id: 'td3',
          title: "Di ngu",
          completed: false,
        },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleToggle = id => {
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


  const onAddTodo = newTodo => {
    setTodoList(prevTodoList => {
      return prevTodoList.concat(newTodo)
    })
  }

  const handleDelete = id => {
    setTodoList(prevTodoList => {
      return prevTodoList.filter(todo => todo.id !== id);
    });
  }

  return (
    <div className="container">
      <h1>Simple TodoList</h1>
      <InputTodo onAddTodo={onAddTodo} />
      <TodoItem data={todoList} onToggle={handleToggle} onDelete= {handleDelete}/>
    </div>
  );


}

export default App;
