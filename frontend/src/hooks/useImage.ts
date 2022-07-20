import { useCallback, useState } from 'react'

export const useImage = (
    defaultImageSrc?: string
): [string | undefined, (files: FileList | null) => void, File | null] => {
    const [imageSrc, setImageSrc] = useState<string | undefined>(defaultImageSrc)
    const [file, setFile] = useState<File | null>(null)

    const setImage = useCallback((files: FileList | null) => {
        if (!files) {
            setImageSrc('')
            setFile(null)
            return
        }
        setFile(files[0])
        const fileReader = new FileReader()
        fileReader.readAsDataURL(files[0])
        fileReader.onloadend = () => {
            if (fileReader.result) setImageSrc(fileReader.result as string)
        }
    }, [])

    return [imageSrc, setImage, file]
}
