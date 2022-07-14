import { useCallback, useState } from 'react'

export const useImage = (defaultImageSrc) => {
    const [imageSrc, setImageSrc] = useState(defaultImageSrc)
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
