import React from 'react'
import classes from './Form.module.css'

const Form = React.memo(
    ({ onSubmit, children, padding = '', margin = '', ...props }) => {
        return (
            <form
                {...props}
                style={{
                    margin,
                    padding,
                }}
                className={classes.form}
                onSubmit={onSubmit}
            >
                {children}
            </form>
        )
    }
)

export default Form
