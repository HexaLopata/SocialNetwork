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
import useCSRF from '../../../hooks/useCSRF'
import { PinImageButton } from '../../ui/pinImageButton/PinImageButton'
import { useImage } from '../../../hooks/useImage'
import defaultImage from '../../../global/default-profile-icon.jpg'

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
            imageSrc={message.image_source}
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
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [text, setText] = useState('')
    const chatDiv = useRef<HTMLDivElement>(null)
    const csrf = useCSRF()
    const [src, setImage, image] = useImage('')

    const selectFile = () => {
        fileInputRef.current?.click()
    }

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files)
        }
    }

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim() !== '' || image) {
            WebSocketChat.sendMessage(
                {
                    body: text,
                },
                csrf,
                image || undefined
            )
            setText('')
            setImage(null)
        }
    }

    const scrollDown = () => {
        if (chatDiv.current) {
            chatDiv.current.scrollTop = chatDiv.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollDown()
        if (chat) {
            WebSocketChat.establishConnection(chat, (message: MessageType) => {
                addRealTimeMessage(message)
                scrollDown()
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
                    src={otherAccount?.profile_picture_source || defaultImage}
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

            <form
                onSubmit={sendMessage}
                className={classes.messageInputContainer}
            >
                <div
                    onClick={() => setImage(null)}
                    className={classes.imageContainer}
                >
                    <Img maxWidth='150px' maxHeight='150px' src={src} />
                </div>
                <input
                    type='file'
                    className={classes.fileInput}
                    onChange={updateInput}
                    ref={fileInputRef}
                />
                <TextInput
                    placeholder='Сообщение'
                    value={text}
                    setValue={setText}
                />
                <PinImageButton onClick={selectFile} />
                <SendMessageButton type='submit' />
            </form>
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
