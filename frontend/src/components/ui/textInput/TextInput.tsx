import React, { useMemo } from 'react'
import classes from './TextInput.module.css'
import deleteIcon from './icons8-delete.svg'
import { Props } from '../../../types/Props'

interface TextInputProps extends Props {
    value?: string
    setValue: (value: string) => void
    password?: boolean
}

const TextInput = React.memo<
    TextInputProps & React.HTMLProps<HTMLInputElement>
>(function TextInput({ value, setValue, password = false, ...props }) {
    const clearButtonClasses = useMemo(() => {
        if (value?.trim() !== '') return classes.clear
        return classes.clear + ' ' + classes.transparent
    }, [value])

    return (
        <div className={classes.inputContainer}>
            <input
                type={password ? 'password' : 'text'}
                className={classes.textInput}
                placeholder={props.placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...props}
            />
            <div
                className={clearButtonClasses}
                style={{ maskImage: `url(${deleteIcon})` }}
                onClick={() => setValue('')}
            />
        </div>
    )
})

export default TextInput
