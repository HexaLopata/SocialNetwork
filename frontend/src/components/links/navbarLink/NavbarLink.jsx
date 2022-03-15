import classes from './NavbarLink.module.css'
import { Link } from 'react-router-dom';

function NavbarLink({children, to}) {
    return (  
        <Link to={to ?? '/'} className={classes.navbarButton}>{children}</Link>
    );
}

export default NavbarLink;