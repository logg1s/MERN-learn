import { useReducer, useEffect } from 'react'
import { validate } from '../../util/validators'
import './Input.css'

function InputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
            case 'TOUCH':
                return {
                    ...state,
                    isTouched: true
                }
            default: return state
    }
}

function Input(props) {
    const [inputState, dispatch] = useReducer(InputReducer, {
        value: '',
        isTouched: false,
        isValid: false
    })

      const { id, onInput } = props
      const {value, isValid} = inputState
    useEffect(() => {
      onInput(id, value, isValid)
    }, [id, value, isValid, onInput])


    const changeHandler = event => {
        dispatch({
          type: 'CHANGE',
          val: event.target.value,
          validators: props.validators
        })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })

    }

  const element =
    props.element === 'input' ? (
      <input type={props.type} id={props.id} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}/>
    ) : (
      <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} value={inputState.value} onBlur={touchHandler}></textarea>
    )

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  )
}

export default Input
