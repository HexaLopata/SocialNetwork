import React, { FC } from 'react'
import RoundButton from '../roundButton/RoundButton'
import imageSvg from './paper-clip-svgrepo-com.svg'

export const PinImageButton: FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ ...props }) => {
    return (
        <RoundButton maskImageSrc={imageSvg} maskSize='30px 30px' {...props} />
    )
}
