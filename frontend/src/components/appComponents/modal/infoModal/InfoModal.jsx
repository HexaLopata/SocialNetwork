import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SimpleButton from '../../../ui/simpleButton/SimpleButton'
import Text from '../../../ui/text/Text'
import classes from './InfoModal.module.css'

function InfoModal({ error, buttonText = 'Ок' }) {
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
        setIsEnabled(error.trim() !== '')
    }, [error])

    const getClasses = () => {
        if (isEnabled) return classes.infoModal + ' ' + classes.enabled
        return classes.infoModal
    }

    return (
        <div className={getClasses()}>
            <div className={classes.colorBar} />
            <div className={classes.bottomContainer}>
                <div className={classes.textContainer}>
                    <Text paragraphClass='textContrast'>{error}</Text>
                </div>
                <div className={classes.buttonContainer}>
                    <SimpleButton
                        variant='dark'
                        onClick={(e) => setIsEnabled(!isEnabled)}
                    >
                        {buttonText}
                    </SimpleButton>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    error: state.app.error,
    info: state.app.info,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal)
