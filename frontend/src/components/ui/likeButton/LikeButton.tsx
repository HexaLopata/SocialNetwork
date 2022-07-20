import classes from './LikeButton.module.css'
import heartImage from './like-svgrepo-com.svg'
import React, { FC, useMemo } from 'react'
import { Props } from '../../../types/Props'

interface LikeButtonProps extends Props {
    liked?: boolean
}

const LikeButton: FC<LikeButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
    children,
    liked = false,
    ...props
}) => {
    const buttonClasses = useMemo((): string => {
        if (liked) return classes.likeButton + ' ' + classes.closed
        return classes.likeButton
    }, [liked])

    return (
        <button className={buttonClasses} {...props} type='button'>
            <div
                className={classes.heart}
                style={{ maskImage: `url(${heartImage})` }}
            ></div>
            {children}
        </button>
    )
}

export default LikeButton
