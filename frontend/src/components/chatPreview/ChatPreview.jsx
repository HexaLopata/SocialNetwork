import React from 'react'
import classes from './ChatPreview.module.css'

export default function ChatPreview({ chatPicture, chatName, lastMessage }) {
    return (
        <div className={classes.chatPreview}>
            <img
                src={chatPicture}
                alt="Изображение чата"
                className={classes.chatPicture} />
            <div className={classes.chatNameContainer}>
                <h2>{chatName}</h2>
                <h4>{lastMessage}</h4>
            </div>
        </div>
    )
}
