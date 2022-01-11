import { Link } from "react-router-dom";
import classes from './NormalButton.module.css'

function NormalButton({children, goTo, ...props}) {
    return ( 
        <Link {...props} className={classes.normalButton} to={goTo ?? ''}>
            {children}
        </Link>
    );
}

export default NormalButton;