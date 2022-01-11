import classes from './Navbar.module.css'

function Navbar({children}) {
    return (
        <div className={classes.navbar}>
            {children}
        </div>
    );
}

export default Navbar;