import React from 'react'
import Chat from '../../components/appComponents/chat/Chat'
import classes from './ChatPage.module.css'

export default function ChatPage() {
    return (
        <div className={classes.chatPageContainer}>
            <Chat />
        </div>
    )
}