import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Message from '../message/Message'
import { Chat as ChatType, Message as MessageType } from '../../../types/Chat'
import SendMessageButton from '../../ui/sendMessageButton/SendMessageButton'
import TextInput from '../../ui/textInput/TextInput'
import classes from './Chat.module.css'
import { Props } from '../../../types/Props'
import { WebSocketChat } from '../../../services/WebSocketChat'
import { Account } from '../../../types/Account'
import { RootState, TDispatch } from '../../../redux/store'
import { connect } from 'react-redux'
import {
    addRealTimeMessage,
    setRealTimeMessages,
} from '../../../redux/reducers/chatReducer'
import { Img } from '../../ui/img/Img'

interface ChatProps extends Props {
    chat: ChatType
    account: Account | null
    addRealTimeMessage: (message: MessageType) => void
    realTimeMessages: MessageType[]
    setRealTimeMessages: (messages: MessageType[]) => void
}

const createMessageComponent = (
    message: MessageType,
    account: Account | null,
    otherAccount: Account | undefined
) => {
    const own = account?.id === message.author?.id
    const author = own
        ? account?.first_name + ' ' + account?.last_name
        : otherAccount?.first_name + ' ' + otherAccount?.last_name
    return (
        <Message
            own={own}
            key={message.id}
            body={message.body}
            author={author}
        />
    )
}

const Chat: FC<ChatProps> = ({
    chat,
    account,
    addRealTimeMessage,
    realTimeMessages,
    setRealTimeMessages,
}) => {
    const [text, setText] = useState('')
    const chatDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chat) {
            WebSocketChat.establishConnection(chat, (message: MessageType) => {
                addRealTimeMessage(message)
                if (chatDiv.current) {
                    chatDiv.current.scrollTop = chatDiv.current.scrollHeight
                }
            })
        }

        return () => {
            WebSocketChat.disconnect()
            setRealTimeMessages([])
        }
    }, [chat])

    const otherAccount = useMemo(
        () => chat.members.find((a) => a.id !== account?.id),
        [account, chat]
    )

    return (
        <div className={classes.chat}>
            <div className={classes.chatLabel}>
                <Img
                    src={otherAccount?.profile_picture_source}
                    alt='Изображение чата'
                    width='70px'
                    height='70px'
                />
                <h3>Личные сообщения c {otherAccount?.first_name}</h3>
            </div>
            <div ref={chatDiv} className={classes.messageSection}>
                {chat.messages?.map((m) =>
                    createMessageComponent(m, account, otherAccount)
                )}
                {realTimeMessages?.map((m) =>
                    createMessageComponent(m, account, otherAccount)
                )}
            </div>

            <div className={classes.messageInputContainer}>
                <TextInput
                    placeholder='Сообщение'
                    value={text}
                    setValue={setText}
                />
                <SendMessageButton
                    onClick={() => {
                        if (text.trim() !== '') {
                            WebSocketChat.sendMessage({
                                body: text,
                            })
                            setText('')
                        }
                    }}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    account: state.account.account,
    realTimeMessages: state.chat.realTimeMessages,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        addRealTimeMessage: (message: MessageType) =>
            dispatch(addRealTimeMessage(message)),
        setRealTimeMessages: (messages: MessageType[]) =>
            dispatch(setRealTimeMessages(messages)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
