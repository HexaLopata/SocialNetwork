import React from 'react'
import classes from './CenteredBlock.module.css'

export default function CenteredBlock({ children }) {
    return (
        <div className={classes.centeredBlock}>
            {children}
        </div>
    )
}
