import "./TodoItem.css";
import PropTypes from "prop-types";

function TodoItem({ data, onToggle, onDelete }) {
  const handleToggle = id => {
    onToggle(id);
  };
  const handleDelete = id => {
    onDelete(id)
  }
  return (
    <ul>
      {data.map((todo) => {
        return (
          <div key={todo.id}
          style={
            {display: 'flex', justifyContent: 'space-between', alignItems: 'center'}
            }>
          <li onClick={() => handleToggle(todo.id)}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.title}
          </li>
          <a href="#" onClick={() => {handleDelete(todo.id)}}>Xoá</a>
          </div>
        );
      })}
    </ul>
  );
}

TodoItem.propTypes = {
  data: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;
