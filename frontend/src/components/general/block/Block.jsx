import React from 'react';
import classes from './Block.module.css'

const Block = React.forwardRef(({children, ...props}, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={classes.block}>
            {children}
        </div>
    );
})

export default Block;