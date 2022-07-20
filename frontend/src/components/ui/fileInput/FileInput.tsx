import React, { FC, useCallback, useRef } from 'react'
import { Props } from '../../../types/Props'
import SimpleButton, { SimpleButtonVariant } from '../simpleButton/SimpleButton'
import classes from './FileInput.module.css'

interface FileInputProps extends Props {
    variant: SimpleButtonVariant
}

const FileInput: FC<
    FileInputProps &
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
> = ({ variant, children, ...props }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const selectFile = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    return (
        <>
            <div className={classes.buttonContainer}>
                <SimpleButton variant={variant} onClick={selectFile}>
                    {children}
                </SimpleButton>
            </div>
            <input
                className={classes.fileInput}
                ref={fileInputRef}
                type='file'
                {...props}
            />
        </>
    )
}

export default FileInput
