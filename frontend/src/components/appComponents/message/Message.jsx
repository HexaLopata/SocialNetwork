import React from 'react'
import classes from './Message.module.css'
import Text from '../../ui/text/Text'

export default function Message({ author, body, imageSrc, own = true }) {

    const getClasses = () => {
        if (own) {
            return classes.message + ' ' + classes.my
        }
        return classes.message + ' ' + classes.other
    }

    return (
        <div className={classes.messageContainer}>
            <div className={getClasses()}>
                <h3>{author}</h3>
                <Text paragraphClass={classes.messageText}>
                    {body}
                </Text>
                { imageSrc && imageSrc.trim() !== '' &&
                    <img
                        src={imageSrc}
                        className={classes.messageImage}
                        alt='Изображение'
                    />
                }
            </div>
        </div>
    )
}
