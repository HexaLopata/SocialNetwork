import React, { FC } from 'react'
import classes from './BackgroundImage.module.css'
import transparent from '../../../global/transparent.gif'
import { Props } from '../../../types/Props'

interface BackgroundImageProps extends Props {
    src?: string
}

export const BackgroundImage: FC<BackgroundImageProps> = ({ src }) => {
    return (
        <img
            src={src || transparent}
            className={classes.backgroundImage}
            alt=''
        />
    )
}
