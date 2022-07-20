import React, { FC } from 'react'
import classes from './NavbarButton.module.css'
import { Link, LinkProps } from 'react-router-dom'
import { Props } from '../../../types/Props'

interface NavbarButtonProps extends Props {
    imageSrc: string
    text: string
    to: string
}

const NavbarButton: FC<NavbarButtonProps & LinkProps> = ({
    imageSrc,
    text,
    to = '/',
    ...props
}) => {
    return (
        <Link className={classes.navbarButton} to={to} {...props}>
            <div
                style={{ maskImage: `url(${imageSrc})` }}
                className={classes.buttonLogo}
            />
            <span className={classes.buttonText}>{text}</span>
        </Link>
    )
}

export default NavbarButton
