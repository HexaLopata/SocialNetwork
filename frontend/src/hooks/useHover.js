import { useEffect, useState, createRef } from "react"

export const useHover = () => {
    const [isHovering, setHovering] = useState(false)
    const ref = createRef()

    const hover = () => { setHovering(true) }
    const leaveHover = () => { setHovering(false) }

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('mouseenter', hover)
            ref.current.addEventListener('mousemove', hover)
            ref.current.addEventListener('mouseleave', leaveHover)

            return () => {
                if (ref.current) {
                    ref.current.removeEventListener('mouseenter', hover)
                    ref.current.removeEventListener('mousemove', hover)
                    ref.current.removeEventListener('mouseleave', leaveHover)
                }
            }
        }
    }, [])
    return [ref, isHovering]
}