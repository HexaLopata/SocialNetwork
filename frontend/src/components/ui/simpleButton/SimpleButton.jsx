import React, { useCallback } from 'react'
import classes from './SimpleButton.module.css'

export default function SimpleButton({ variant = 'secondary', ...props }) {
    const getClasses = useCallback(() => {
        const variantTrimed = variant.trim()
        let buttonClasses = classes.simpleButton + ' '
        switch (variantTrimed) {
            case 'secondary':
                return buttonClasses + classes.secondary
            case 'primary':
                return buttonClasses + classes.primary
            case 'dark':
                return buttonClasses + classes.dark
            default:
                return buttonClasses + classes.secondary
        }
    }, [variant])

    return <button {...props} type='button' className={getClasses()} />
}
