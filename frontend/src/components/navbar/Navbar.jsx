import { connect } from 'react-redux';
import NavbarLink from '../links/navbarLink/NavbarLink';
import classes from './Navbar.module.css'

const getLinks = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <>
                <NavbarLink to="/profile">Профиль</NavbarLink>
                <NavbarLink to="/news">Лента</NavbarLink>
                <NavbarLink to="/messages">Сообщения</NavbarLink>
            </>
        )
    } 
    return (
        <NavbarLink to="/login">Логин</NavbarLink>
    )
}

function Navbar({ children, isAuthenticated }) {
    return (
        <div className={classes.navbar}>
            {children}
            {getLinks(isAuthenticated)}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    ...ownProps
})

export default connect(mapStateToProps)(Navbar);