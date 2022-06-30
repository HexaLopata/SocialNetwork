import React from 'react'
import classes from './Block.module.css'


export default function Block({ width, height, padding, margin, className, children }) {
    return (
        <div
            style={{
                width: width,
                height: height,
                padding: padding,
                margin: margin,
            }}
            className={classes.block + ' ' + className}
        >
            {children}
        </div>
    )
}
