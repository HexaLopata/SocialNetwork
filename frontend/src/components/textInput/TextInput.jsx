import React from 'react'
import classes from './TextInput.module.css'
import deleteIcon from './icons8-delete.svg'

function TextInput({ value, setValue, password = false, placeholder = '' }) {

  const getClearButtonClasses = () => {
    if (value.trim() !== '')
      return classes.clear
    return classes.clear + ' ' + classes.transparent
  }

  return (
    <div className={classes.inputContainer}>
      <input
        type={password ? 'password' : 'text'}
        className={classes.textInput}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div
        className={getClearButtonClasses()}
        style={{ maskImage: `url(${deleteIcon})` }}
        onClick={e => setValue('')}
      />
    </div>
  )
}


export default TextInput