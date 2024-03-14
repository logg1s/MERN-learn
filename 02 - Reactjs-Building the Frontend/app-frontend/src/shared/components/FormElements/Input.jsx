import React from 'react'
import './Input.css'

function Input(props) {
  const element =
    props.element === 'input' ? (
      <input type={props.type} id={props.id} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3}></textarea>
    )

  return (
    <div className='form-control'>
      <label htmlFor={props.id}>{props.label}</label>
        {element}
    </div>
  )
}

export default Input
