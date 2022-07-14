import React, { useRef } from 'react'
import SimpleButton from '../simpleButton/SimpleButton'
import classes from './FileInput.module.css'

export default function FileInput({ variant, children, ...props }) {
    const fileInputRef = useRef(null)

    const selectFile = (_) => {
        fileInputRef.current.click()
    }

    return (
        <>
            <div className={classes.buttonContainer}>
                <SimpleButton variant={variant} onClick={selectFile} >
                    {children}
                </SimpleButton>
            </div>
            <input className={classes.fileInput} ref={fileInputRef} type='file' {...props} />
        </>
    )
}
