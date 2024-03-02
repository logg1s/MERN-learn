import { useState } from "react";
import "./InputTodo.css";
import PropTypes from 'prop-types';
function InputTodo(props) {
  const [enteredText, setEnteredText] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    if(enteredText === '') {
      return;
    }
    const newTodo = {
      id: Math.random().toString(),
      title: enteredText,
      complete: false
    }
    props.onAddTodo(newTodo);
    setEnteredText('')
  }

  const handlerInput = event => {
    setEnteredText(event.target.value)
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={enteredText} onChange={handlerInput} />
      <button type="submit">Add Todo</button>
    </form>
  );
}

InputTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired
};

export default InputTodo;
