import React from 'react'
import { Props } from '../../../types/Props'
import classes from './Form.module.css'

interface FormProps extends Props {
    padding?: string
    margin?: string
}

const Form = React.memo<FormProps & React.HTMLProps<HTMLFormElement>>(
    function Form({ padding, margin, children, ...props }) {
        return (
            <form
                {...props}
                style={{
                    margin,
                    padding,
                }}
                className={classes.form}
            >
                {children}
            </form>
        )
    }
)

export default Form
