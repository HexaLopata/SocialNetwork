import React, { useRef } from 'react'
import { useImage } from '../../../hooks/useImage'
import classes from './ImageInput.module.css'

export default function ImageInput({
    width,
    height,
    margin,
    setFile,
    defaultImageSrc,
    objectFit,
    ...props
}) {
    const fileInputRef = useRef(null)
    const [src, setImage] = useImage(defaultImageSrc)

    const selectFile = (_) => {
        fileInputRef.current.click()
    }

    const updateInput = (e) => {
        setImage(e.target.files)
        setFile(e.target.files[0])
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
                {...props}
            />
        </>
    )
}
