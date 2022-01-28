import classes from './HeaderLabel.module.css'

function HeaderLabel({children}) {
    return ( 
        <div className={classes.headerLabel}>
            {children}
        </div>
    );
}

export default HeaderLabel;