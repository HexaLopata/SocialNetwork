import React from 'react'
import classes from './TextArea.module.css'

export default function TextArea({ value, setValue, height, width }) {
    return (
        <textarea
            style={{
                height,
                width,
            }}
            className={classes.textarea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}
