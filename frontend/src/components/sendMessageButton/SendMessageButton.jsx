import React from 'react'
import classes from './SendMessageButton.module.css'
import arrowImage from './arrow-right-svgrepo-com.svg'

export default function SendMessageButton(onClick) {
    return (
        <div className={classes.buttonContainer}>
            <button
                className={classes.sendMessageButton}
                style={{ maskImage: `url(${arrowImage})` }}
                onClick={e => onClick(e)}
            />
        </div>
    )
}
