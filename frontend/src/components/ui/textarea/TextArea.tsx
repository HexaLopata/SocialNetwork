import React, { FC } from 'react'
import { Props } from '../../../types/Props'
import classes from './TextArea.module.css'

interface TextAreaProps extends Props {
    width?: string
    height?: string
    setValue: (value: string) => void
}

const TextArea: FC<TextAreaProps & React.HTMLProps<HTMLTextAreaElement>> = ({
    value,
    setValue,
    height,
    width,
    ...props
}) => {
    return (
        <textarea
            style={{
                height,
                width,
            }}
            className={classes.textarea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        />
    )
}

export default TextArea
