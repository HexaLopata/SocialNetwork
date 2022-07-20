import React, { useMemo } from 'react'
import { Props } from '../../../types/Props'
import classes from './Block.module.css'

interface BlockProps extends Props {
    width?: string
    height?: string
    padding?: string
    margin?: string
    className?: string
}

const Block = React.memo<BlockProps>(
    function Block({ width, height, padding, margin, className, children }) {
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
