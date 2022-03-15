import React from 'react'
import classes from './TextInput.module.css'

export default function TextInput({children, placeholder, value, onChange, isPassword = false}) {
  return (
    <input 
        placeholder={placeholder} 
        className={classes.textInput} 
        type={isPassword ? 'password' : 'text'}
        value={value}
        onChange={e => onChange(e)}
    >
        {children}
    </input>
  )
}
