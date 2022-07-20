import React, { FC, useCallback } from 'react'
import NavbarButton from '../../ui/navbarButton/NavbarButton'
import classes from './Navbar.module.css'
import messageImage from './message-svgrepo-com.svg'
import newsImage from './news-svgrepo-com.svg'
import profileImage from './profile-svgrepo-com.svg'
import useCSRF from '../../../hooks/useCSRF'
import { connect } from 'react-redux'
import { logout } from '../../../redux/reducers/authReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Props } from '../../../types/Props'

interface NavbarProps extends Props {
    logout: (csrf: string) => void
}

const Navbar: FC<NavbarProps> = ({ logout }) => {
    const csrf = useCSRF()
    const onExitClick = useCallback(() => {
        logout(csrf)
    }, [logout, csrf])

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
            <NavbarButton
                imageSrc=''
                text='Выйти'
                to='/login'
                onClick={onExitClick}
            />
        </div>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        logout: (csrf: string) => {
            dispatch(logout(csrf))
        },
    }
}

export default connect(null, mapDispatchToProps)(Navbar)
