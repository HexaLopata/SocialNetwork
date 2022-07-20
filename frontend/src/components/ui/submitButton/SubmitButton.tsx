import React, { FC, useMemo } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Props } from '../../../types/Props'
import classes from './SubmitButton.module.css'

interface SubmitButtonProps extends Props {
    value: string
    isFormUploading: boolean
}

const SubmitButton: FC<SubmitButtonProps> = ({ value, isFormUploading }) => {
    const buttonClasses = useMemo((): string => {
        if (isFormUploading)
            return classes.submitButton + ' ' + classes.animating
        return classes.submitButton
    }, [isFormUploading])

    return (
        <div className={classes.container}>
            <input type='submit' className={buttonClasses} value={value} />
            <div className={classes.buttonAnimation} />
            <div className={classes.loader} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    isFormUploading: state.app.isFormUploading,
})

export default connect(mapStateToProps)(SubmitButton)
