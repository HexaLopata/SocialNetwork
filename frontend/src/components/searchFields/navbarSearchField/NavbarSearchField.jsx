import classes from './NavbarSearchField.module.css'

function NavbarSearchField({placeholder}) {
    return ( 
        <div>
            <input className={classes.searchInput} placeholder={placeholder} type="text" />
        </div>
    );
}

export default NavbarSearchField;