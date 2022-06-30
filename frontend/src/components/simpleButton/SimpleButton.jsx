import React from 'react'
import classes from './SimpleButton.module.css'

export default function SimpleButton({ variant = 'secondary', ...props }) {

    const getClasses = () => {
        const variantTrimed = variant.trim()
        let buttonClasses = classes.simpleButton + ' '
        switch(variantTrimed) {
            case 'secondary':
                return buttonClasses + classes.secondary
            case 'primary':
                return buttonClasses + classes.primary
            case 'dark':
                return buttonClasses + classes.dark
            default:
                return buttonClasses + classes.primary 
        }
    } 

    return (
        <button
            {...props}
            className={getClasses()} 
        />
    )
}
