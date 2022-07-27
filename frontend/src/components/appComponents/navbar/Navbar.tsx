import React, { FC, useCallback } from 'react'
import NavbarButton from '../../ui/navbarButton/NavbarButton'
import classes from './Navbar.module.css'
import messageImage from './message-svgrepo-com.svg'
import newsImage from './news-svgrepo-com.svg'
import profileImage from './profile-svgrepo-com.svg'
import loginImage from './artmaster_login_mini_icon.svg'
import logoutImage from './artmaster_logout_mini_icon.svg'
import registerImage from './edit-icon.svg'
import useCSRF from '../../../hooks/useCSRF'
import { connect } from 'react-redux'
import { logout } from '../../../redux/reducers/authReducer/asyncActions'
import { RootState, TDispatch } from '../../../redux/store'
import { Props } from '../../../types/Props'
import { setIsAuth } from '../../../redux/reducers/authReducer'

interface NavbarProps extends Props {
    logout: (csrf: string) => void
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

const Navbar: FC<NavbarProps> = ({ logout, isAuthenticated, setIsAuthenticated }) => {
    const csrf = useCSRF()
    const onExitClick = useCallback(() => {
        setIsAuthenticated(false)
        logout(csrf)
    }, [logout, csrf])

    return (
        <div className={classes.navbar}>
            {isAuthenticated ? (
                <>
                    <NavbarButton
                        imageSrc={messageImage}
                        text='Сообщения'
                        to='/messages'
                    />
                    <NavbarButton
                        imageSrc={newsImage}
                        text='Посты'
                        to='/news'
                    />
                    <NavbarButton
                        imageSrc={profileImage}
                        text='Профиль'
                        to='/profile'
                    />
                    <NavbarButton
                        imageSrc={logoutImage}
                        text='Выйти'
                        to='/login'
                        data-last
                        onClick={onExitClick}
                    />
                </>
            ) : (
                <>
                    <NavbarButton
                        imageSrc={registerImage}
                        text='Регистрация'
                        to='/register'
                    />
                    <NavbarButton
                        imageSrc={loginImage}
                        text='Логин'
                        to='/login'
                    />
                </>
            )}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        logout: (csrf: string) => {
            dispatch(logout(csrf))
        },
        setIsAuthenticated: (isAuthenticated: boolean) => {
            dispatch(setIsAuth(isAuthenticated))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
