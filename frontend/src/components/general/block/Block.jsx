import React from 'react';
import classes from './Block.module.css'

const Block = React.forwardRef(({children, additionalClasses = [], ...props}, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={classes.block + ' ' + additionalClasses.join(' ')}>
            {children}
        </div>
    );
})

export default Block;