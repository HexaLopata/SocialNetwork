import React from 'react'
import classes from './NavbarButton.module.css'


export default function NavbarButton({ imageSrc, text }) {
    return (
        <div className={classes.navbarButton}>
            <div 
                style={{maskImage: `url(${imageSrc})`}}
                className={classes.buttonLogo} />
            <span className={classes.buttonText}>
                {text}
            </span>
        </div>
    )
}
