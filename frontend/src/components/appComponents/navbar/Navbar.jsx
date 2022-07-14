import React, { useCallback } from 'react'
import NavbarButton from '../../ui/navbarButton/NavbarButton'
import classes from './Navbar.module.css'
import messageImage from './message-svgrepo-com.svg'
import newsImage from './news-svgrepo-com.svg'
import profileImage from './profile-svgrepo-com.svg'
import useCSRF from '../../../hooks/useCSRF'
import { connect } from 'react-redux'
import { logout } from '../../../redux/reducers/authReducer/actions'

function Navbar({ logout }) {
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


const mapDispatchToProps = (dispatch) => {
    return {
        logout: (csrf) => { dispatch(logout(csrf)) } 
    }
}

export default connect(null, mapDispatchToProps)(Navbar)