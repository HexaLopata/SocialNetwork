import classes from './SmallLabel.module.css'

function SmallLabel({children}) {
    return ( 
        <div className={classes.smallLabel}>
            {children}
        </div>
    );
}

export default SmallLabel;