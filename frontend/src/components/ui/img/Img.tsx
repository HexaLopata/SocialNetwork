import React, { FC } from 'react'
import { Props } from '../../../types/Props'
import classes from './Img.module.css'

interface ImgProps extends Props {
    width?: string
    height?: string
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | undefined
    borderRadius?: string
}

export const Img: FC<
    ImgProps &
        React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
        >
> = ({
    width,
    height,
    objectFit = 'cover',
    borderRadius = '15px',
    ...props
}) => {
    return (
        <img
            className={classes.img}
            style={{
                width,
                height,
                objectFit,
                borderRadius,
            }}
            {...props}
        ></img>
    )
}
