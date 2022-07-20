import React, { FC } from 'react'
import classes from './SendMessageButton.module.css'
import arrowImage from './arrow-right-svgrepo-com.svg'

const SendMessageButton: FC<React.HTMLProps<HTMLButtonElement>> = ({
    ...props
}) => {
    return (
        <div className={classes.buttonContainer}>
            <button
                className={classes.sendMessageButton}
                style={{ maskImage: `url(${arrowImage})` }}
                {...props}
                type='button'
            />
        </div>
    )
}

export default SendMessageButton
