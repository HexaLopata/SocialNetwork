import React, { useCallback, useRef, useState } from 'react'
import useCSRF from '../../../hooks/useCSRF'
import { useImage } from '../../../hooks/useImage'
import { WebSocketChat } from '../../../services/WebSocketChat'
import { Img } from '../../ui/img/Img'
import { PinImageButton } from '../../ui/pinImageButton/PinImageButton'
import SendMessageButton from '../../ui/sendMessageButton/SendMessageButton'
import TextInput from '../../ui/textInput/TextInput'
import classes from './SendMessageForm.module.css'

export const SendMessageForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [text, setText] = useState('')
    const csrf = useCSRF()
    const [src, setImage, image] = useImage('')

    const sendMessage = useCallback((e: React.FormEvent) => {
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
    }, [text, image, csrf, setText, setImage])

    const selectFile = () => {
        fileInputRef.current?.click()
    }

    const updateInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                setImage(e.target.files)
            }
        },
        [setImage]
    )

    return (
        <form onSubmit={sendMessage} className={classes.messageInputContainer}>
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
    )
}
