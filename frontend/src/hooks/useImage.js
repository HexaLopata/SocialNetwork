import { useCallback, useState } from 'react'

export const useImage = () => {
    const [imageSrc, setImageSrc] = useState('')
    const [file, setFile] = useState(null)

    const setImage = useCallback((files) => {
        if (!files) {
            setImageSrc('')
            setFile(null)
            return
        }
        setFile(files[0])
        const fileReader = new FileReader()
        fileReader.readAsDataURL(files[0])
        fileReader.onloadend = () => {
            setImageSrc(fileReader.result)
        }
    }, [])

    return [imageSrc, setImage, file]
}
