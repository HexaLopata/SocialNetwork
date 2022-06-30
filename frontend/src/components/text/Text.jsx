import React from 'react'

export default function Text({ children, paragraphClass = '' }) {

    const strings = children ? children.split('\n') : ['']

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
