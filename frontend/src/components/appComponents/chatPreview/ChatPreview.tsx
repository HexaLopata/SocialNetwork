import React, { FC } from 'react'
import { Props } from '../../../types/Props'
import classes from './ChatPreview.module.css'
import defaultImage from '../../../global/default-profile-icon.jpg'

interface ChatPreviewProps extends Props {
    chatPicture: string
    chatName: string
    lastMessage: string
    onClick: () => void
}

const ChatPreview: FC<ChatPreviewProps> = ({
    chatPicture,
    chatName,
    lastMessage,
    onClick
}) => {
    return (
        <div onClick={onClick} className={classes.chatPreview}>
            <img
                src={chatPicture || defaultImage}
                alt='Изображение чата'
                className={classes.chatPicture}
            />
            <div className={classes.chatNameContainer}>
                <h3>{chatName}</h3>
                <h4>{lastMessage}</h4>
            </div>
        </div>
    )
}

export default ChatPreview
