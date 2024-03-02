import "./InputTodo.css";
import PropTypes from 'prop-types';
function InputTodo(props) {

  const onSubmit = (event) => {
    event.preventDefault()
    const newTodo = {
      id: Math.random().toString(),
      title: 'hehes',
      complete: false
    }
    props.onAddTodo(newTodo);
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" />
      <button type="submit">Add Todo</button>
    </form>
  );
}

InputTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired
};

export default InputTodo;
