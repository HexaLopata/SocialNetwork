import React, { FC, useMemo } from 'react'
import classes from './Message.module.css'
import Text from '../../ui/text/Text'
import { Props } from '../../../types/Props'

interface MessageProps extends Props {
    author: string
    body: string
    imageSrc?: string
    own?: boolean
}

const Message: FC<MessageProps> = ({ author, body, imageSrc, own = true }) => {
    const messageClasses = useMemo((): string => {
        if (own) {
            return classes.message + ' ' + classes.my
        }
        return classes.message + ' ' + classes.other
    }, [own])

    return (
        <div className={classes.messageContainer}>
            <div className={messageClasses}>
                <h3>{author}</h3>
                <Text paragraphClass={classes.messageText}>{body}</Text>
                {imageSrc && imageSrc.trim() !== '' && (
                    <img
                        src={imageSrc}
                        className={classes.messageImage}
                        alt='Изображение'
                    />
                )}
            </div>
        </div>
    )
}

export default Message
