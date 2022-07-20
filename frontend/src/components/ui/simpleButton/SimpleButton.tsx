import React, { FC, useMemo } from 'react'
import { Props } from '../../../types/Props'
import classes from './SimpleButton.module.css'

export enum SimpleButtonVariant {
    secondary,
    primary,
    dark,
}

interface SimpleButtonProps extends Props {
    variant?: SimpleButtonVariant
}

const SimpleButton: FC<
    SimpleButtonProps & React.HTMLProps<HTMLButtonElement>
> = ({ variant = 'secondary', ...props }) => {
    const buttonClasses = useMemo(() => {
        const buttonClasses = classes.simpleButton + ' '
        switch (variant) {
            case SimpleButtonVariant.secondary:
                return buttonClasses + classes.secondary
            case SimpleButtonVariant.primary:
                return buttonClasses + classes.primary
            case SimpleButtonVariant.dark:
                return buttonClasses + classes.dark
            default:
                return buttonClasses + classes.secondary
        }
    }, [variant])

    return <button {...props} type='button' className={buttonClasses} />
}

export default SimpleButton
