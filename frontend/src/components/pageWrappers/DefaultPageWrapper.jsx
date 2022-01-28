import classes from './DefaultPageWrapper.module.css'

function DefaultPageWrapper({ children }) {
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
}

export default DefaultPageWrapper;