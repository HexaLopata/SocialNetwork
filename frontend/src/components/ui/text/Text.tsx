import React, { FC, useMemo } from 'react'
import { Props } from '../../../types/Props'

interface TextProps extends Props {
    paragraphClass?: string
    children: string
}

const Text: FC<TextProps> = ({ children, paragraphClass = '' }) => {
    const strings = useMemo(
        () => (children ? children.split('\n') : ['']),
        [children]
    )

    return (
        <>
            {strings.map((string, ind) => {
                return (
                    <p key={ind} className={paragraphClass}>
                        {string}
                    </p>
                )
            })}
        </>
    )
}

export default Text
