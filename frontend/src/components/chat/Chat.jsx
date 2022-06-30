import React, { useState } from 'react'
import Message from '../message/Message'
import SendMessageButton from '../sendMessageButton/SendMessageButton'
import TextInput from '../textInput/TextInput'
import classes from './Chat.module.css'

export default function Chat() {
    const [text, setText] = useState('')

    return (
        <div className={classes.chat}>

            <img
                className={classes.chatImage}
                src='https://sun9-30.userapi.com/s/v1/ig2/Jt4cUwMWPAuaUGeiorkcQKIJ9oGgxzYQGm3Yigg5scCT_SajF1Vbhxj1mmG0B9k4Pj0O86Lv0UzVlmwuwbdRBRVH.jpg?size=200x200&quality=96&crop=180,0,539,539&ava=1'
                alt='Изображение чата'
            />

            <div className={classes.chatLabel}>
                <h3>
                    Личные сообщения c Денчик
                </h3>
            </div>

            <Message
                body={`Я как-то раз прикольно посрал, было очень весело, прям пиздец, прям очень`}
                author='Я'
            />
            <Message
                body='Пук'
                own={false}
                author='Денчик'
            />
            <Message
                own={false}
                body='Понимаю'
                author='Денчик'
                imageSrc='https://sun9-1.userapi.com/impf/Yrw6D1NWMuJhXM0IRx_JV8KLJDXTX9mKaTaXmw/hNDe0kDIq1U.jpg?size=965x1080&quality=95&sign=49cb95cabad7eb87b93d4c3764a8ba0b&type=album'
            />
            <Message
                body={`Подписывайтесь на @dxn41k_chan - самый классный и самый пиздааатый канал в тг`}
                author='Я'
                imageSrc='https://sun9-45.userapi.com/impf/9s8AXgakmAhlD9lA-gJPvsSJKWeJ2oqOjZdDyQ/wYlkmJBqYVg.jpg?size=665x1622&quality=96&sign=b943b4f17357254855b8b240a0ca6f53&type=album'
            />
            <Message
                own={false}
                body='#ГладитьСобаку ноу натс'
                author='Денчик'
                imageSrc='https://sun9-31.userapi.com/impg/g6_jM-50Cj5F7cL5IQrKsfPK3EJ8HR8BEBeJoA/K6nr352xsvM.jpg?size=961x388&quality=96&sign=46a5741e225ccd991c40a1d597873ff3&type=album'
            />
            <div className={classes.messageInputContainer}>
                <TextInput
                    placeholder='Сообщение'
                    value={text}
                    setValue={setText}
                />
                <SendMessageButton />
            </div>
        </div>
    )
}
