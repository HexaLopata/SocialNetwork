import React, { FC } from 'react'
import classes from './RoundButton.module.css'
import { Props } from '../../../types/Props'

interface RoundButtonProps extends Props {
    maskImageSrc?: string
    maskSize?: string
}

const RoundButton: FC<
    RoundButtonProps &
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
> = ({ maskImageSrc, maskSize, ...props }) => {
    return (
        <div className={classes.buttonContainer}>
            <button
                className={classes.roundButton}
                style={{ maskImage: `url(${maskImageSrc})`, maskSize }}
                type='button'
                {...props}
            />
        </div>
    )
}

export default RoundButton
