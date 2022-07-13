import React, { useMemo } from 'react'

export default function Text({ children, paragraphClass = '' }) {
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
