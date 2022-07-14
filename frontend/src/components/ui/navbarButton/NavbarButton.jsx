import React from 'react'
import classes from './NavbarButton.module.css'
import { Link } from 'react-router-dom'


export default function NavbarButton({ imageSrc, text, to = '/', ...props }) {
    return (
        <Link
            className={classes.navbarButton}
            to={to}
            {...props}
        >
            <div
                style={{ maskImage: `url(${imageSrc})` }}
                className={classes.buttonLogo} />
            <span className={classes.buttonText}>
                {text}
            </span>
        </Link>
    )
}
