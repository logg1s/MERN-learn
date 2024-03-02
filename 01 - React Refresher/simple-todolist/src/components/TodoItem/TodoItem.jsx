import "./TodoItem.css";
import PropTypes from "prop-types";

function TodoItem({ data, onToggle }) {
  const handleToggle = (id) => {
    onToggle(id);
  };
  return (
    <ul>
      {data.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.title}
          </li>
        );
      })}
    </ul>
  );
}

TodoItem.propTypes = {
  data: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoItem;
