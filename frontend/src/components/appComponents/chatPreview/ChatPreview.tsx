import React, { FC } from 'react'
import { Props } from '../../../types/Props'
import classes from './ChatPreview.module.css'

interface ChatPreviewProps extends Props {
    chatPicture: string
    chatName: string
    lastMessage: string
}

const ChatPreview: FC<ChatPreviewProps> = ({
    chatPicture,
    chatName,
    lastMessage,
}) => {
    return (
        <div className={classes.chatPreview}>
            <img
                src={chatPicture}
                alt='Изображение чата'
                className={classes.chatPicture}
            />
            <div className={classes.chatNameContainer}>
                <h2>{chatName}</h2>
                <h4>{lastMessage}</h4>
            </div>
        </div>
    )
}

export default ChatPreview
