import React, { FC, useEffect, useMemo, useState } from 'react'
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
import { addRealTimeMessage } from '../../../redux/reducers/chatReducer'

interface ChatProps extends Props {
    chat: ChatType
    account: Account | null
    addRealTimeMessage: (message: MessageType) => void
    realTimeMessages: MessageType[]
}

const Chat: FC<ChatProps> = ({
    chat,
    account,
    addRealTimeMessage,
    realTimeMessages,
}) => {
    const [text, setText] = useState('')

    useEffect(() => {
        if (chat) {
            WebSocketChat.establishConnection(chat, (message: MessageType) => {
                addRealTimeMessage(message)
            })
        }

        return () => {
            WebSocketChat.disconnect()
        }
    }, [chat])

    const otherAccount = useMemo(
        () => chat.members.find((a) => a.id !== account?.id),
        [account, chat]
    )

    return (
        <div className={classes.chat}>
            <img
                className={classes.chatImage}
                src={otherAccount?.profile_picture_source}
                alt='Изображение чата'
            />

            <div className={classes.chatLabel}>
                <h3>Личные сообщения c {otherAccount?.first_name}</h3>
            </div>
            {chat.messages?.map((m) => {
                const own = account?.id === m.author?.id
                return (
                    <Message
                        own={own}
                        key={m.id}
                        body={m.body}
                        author={
                            own
                                ? account?.first_name + ' ' + account?.last_name
                                : otherAccount?.first_name +
                                  ' ' +
                                  otherAccount?.last_name
                        }
                    />
                )
            })}
            {realTimeMessages?.map((m) => {
                const own = account?.id === m.author?.id
                return (
                    <Message
                        own={own}
                        key={m.id}
                        body={m.body}
                        author={
                            own
                                ? account?.first_name + ' ' + account?.last_name
                                : otherAccount?.first_name +
                                  ' ' +
                                  otherAccount?.last_name
                        }
                    />
                )
            })}
            <div className={classes.messageInputContainer}>
                <TextInput
                    placeholder='Сообщение'
                    value={text}
                    setValue={setText}
                />
                <SendMessageButton
                    onClick={() =>
                        WebSocketChat.sendMessage({
                            body: text,
                        })
                    }
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
