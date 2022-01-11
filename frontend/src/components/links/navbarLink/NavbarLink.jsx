import classes from './NavbarLink.module.css'
import { Link } from 'react-router-dom';

function NavbarButton({children, to}) {
    return (  
        <Link to={to ?? '/'} className={classes.navbarButton}>{children}</Link>
    );
}

export default NavbarButton;