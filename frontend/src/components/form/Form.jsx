import React from 'react'
import classes from './Form.module.css'

export default function Form({ onSubmit, children }) {
  return (
    <form
        className={classes.form} 
        onSubmit={onSubmit}>
        {children}
    </form>
  )
}
