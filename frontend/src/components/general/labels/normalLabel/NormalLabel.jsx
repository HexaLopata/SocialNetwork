import classes from './NormalLabel.module.css'

function NormalLabel({children}) {
    return ( 
        <div className={classes.label}>
            {children}
        </div>
    );
}

export default NormalLabel;