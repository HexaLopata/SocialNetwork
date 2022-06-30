import React from 'react'
import ChatPreview from '../components/chatPreview/ChatPreview'
import classes from './ChatSelectionPage.module.css'

export default function ChatSelectionPage() {
    return (
        <div className={classes.chatSelectionContainer}>
            <ChatPreview
                chatPicture='Manarola-Seaside-Mountain-Landscape-ipad-air.jpg'
                chatName='Для пацанчиков'
                lastMessage='Для четких'
            />
            <ChatPreview
                chatPicture='Manarola-Seaside-Mountain-Landscape-ipad-air.jpg'
                chatName='Для пацанчиков'
                lastMessage='Для четких'
            />
            <ChatPreview
                chatPicture='Manarola-Seaside-Mountain-Landscape-ipad-air.jpg'
                chatName='Для пацанчиков'
                lastMessage='Для четких'
            />
            <ChatPreview
                chatPicture='Manarola-Seaside-Mountain-Landscape-ipad-air.jpg'
                chatName='Для пацанчиков'
                lastMessage='Для четких'
            />
            <ChatPreview
                chatPicture='Manarola-Seaside-Mountain-Landscape-ipad-air.jpg'
                chatName='Для пацанчиков'
                lastMessage='Для четких'
            />
            
        </div>
    )
}
