import React from 'react'
import classes from './TextInput.module.css'
import deleteIcon from './icons8-delete.svg'

const TextInput = React.memo(
    ({ value, setValue, password = false, placeholder = '', ...props }) => {
        const getClearButtonClasses = () => {
            if (value.trim() !== '') return classes.clear
            return classes.clear + ' ' + classes.transparent
        }

        return (
            <div className={classes.inputContainer}>
                <input
                    type={password ? 'password' : 'text'}
                    className={classes.textInput}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                />
                <div
                    className={getClearButtonClasses()}
                    style={{ maskImage: `url(${deleteIcon})` }}
                    onClick={(e) => setValue('')}
                />
            </div>
        )
    }
)

export default TextInput