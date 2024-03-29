import React, { FC } from 'react'
import arrowImage from './arrow-right-svgrepo-com.svg'
import RoundButton from '../roundButton/RoundButton'

const SendMessageButton: FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ ...props }) => {
    return <RoundButton maskImageSrc={arrowImage} {...props} />
}

export default SendMessageButton
