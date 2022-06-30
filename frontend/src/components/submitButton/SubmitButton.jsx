import { connect } from 'react-redux'
import classes from './SubmitButton.module.css'


function SubmitButton({ value, isFormUploading }) {
    const getClasses = () => {
        if (isFormUploading)
            return classes.submitButton + ' ' + classes.animating
        return classes.submitButton
    }

    return (
        <div className={classes.container}>
            <input
                type="submit"
                className={getClasses()}
                value={value}
            />
            <div className={classes.buttonAnimation} />
            <div className={classes.loader} />
        </div>

    )
}

const mapStateToProps = (state) => ({isFormUploading: state.app.isFormUploading})

export default connect(mapStateToProps)(SubmitButton)