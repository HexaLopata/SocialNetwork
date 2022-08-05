import React, { FC } from 'react'
import classes from './ErrorText.module.css'

export const ErrorText: FC<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
    >
> = ({ ...props }) => {
    return <span {...props} className={classes.errorText}/>
}
