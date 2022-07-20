import React, { FC, useRef } from 'react'
import { useImage } from '../../../hooks/useImage'
import { Props } from '../../../types/Props'
import classes from './ImageInput.module.css'

interface ImageInputProps extends Props {
    width?: string
    height?: string
    margin?: string
    setFile: (file: File) => void
    defaultImageSrc?: string
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | undefined
}

const ImageInput: FC<ImageInputProps> = ({
    width,
    height,
    margin,
    setFile,
    defaultImageSrc,
    objectFit,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [src, setImage] = useImage(defaultImageSrc)

    const selectFile = () => {
        fileInputRef.current?.click()
    }

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files)
            setFile(e.target.files[0])
        }
    }

    return (
        <>
            <div
                className={classes.imageContainer}
                style={{
                    width,
                    height,
                    margin,
                }}
                onClick={selectFile}
            >
                <img
                    style={{
                        objectFit,
                    }}
                    src={src}
                    alt='Изображение'
                    className={classes.image}
                />
            </div>
            <input
                type='file'
                ref={fileInputRef}
                accept='image/*'
                onChange={updateInput}
                className={classes.fileInput}
            />
        </>
    )
}

export default ImageInput
