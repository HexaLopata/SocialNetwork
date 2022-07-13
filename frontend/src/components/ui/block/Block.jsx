import React, { useMemo } from 'react'
import classes from './Block.module.css'

const Block = React.memo(
    ({ width, height, padding, margin, className, children }) => {
        const blockClasses = useMemo(
            () => classes.block + ' ' + className,
            [className]
        )

        return (
            <div
                style={{
                    width,
                    height,
                    padding,
                    margin,
                }}
                className={blockClasses}
            >
                {children}
            </div>
        )
    }
)

export default Block
