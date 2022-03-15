import React from 'react'
import classes from './SubmitButton.module.css'
import { connect } from 'react-redux'

export const SubmitButton = ({children, isFormUploading}) => {
  
    const getClasses = () => {
        if (isFormUploading) 
            return classes.submitButton + ' ' + classes.disabled
        return classes.submitButton
    }

    return (
        <input 
            disabled={isFormUploading} 
            type='submit'
            className={getClasses()}
            value={children}
        >
        </input>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isFormUploading: state.app.isFormUploading,
    ...ownProps
})

export default connect(mapStateToProps)(SubmitButton)
