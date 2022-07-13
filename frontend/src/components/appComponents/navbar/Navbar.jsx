import React from 'react'
import NavbarButton from '../../ui/navbarButton/NavbarButton'
import classes from './Navbar.module.css'
import messageImage from './message-svgrepo-com.svg'
import newsImage from './news-svgrepo-com.svg'
import profileImage from './profile-svgrepo-com.svg'

export default function Navbar() {
    return (
        <div className={classes.navbar}>
            <NavbarButton
                imageSrc={messageImage}
                text='Сообщения'
                to='/messages'
            />
            <NavbarButton imageSrc={newsImage} text='Посты' to='/news' />
            <NavbarButton
                imageSrc={profileImage}
                text='Профиль'
                to='/profile'
            />
        </div>
    )
}