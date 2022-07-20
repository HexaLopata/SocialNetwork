import React, { FC, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Props } from '../../../../types/Props'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../../ui/simpleButton/SimpleButton'
import Text from '../../../ui/text/Text'
import classes from './InfoModal.module.css'

interface InfoModalProps extends Props {
    error: string
    buttonText?: string
}

const InfoModal: FC<InfoModalProps> = ({ error, buttonText = 'Ок' }) => {
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
        setIsEnabled(error.trim() !== '')
    }, [error])

    const modalClasses = useMemo((): string => {
        if (isEnabled) return classes.infoModal + ' ' + classes.enabled
        return classes.infoModal
    }, [isEnabled])

    return (
        <div className={modalClasses}>
            <div className={classes.colorBar} />
            <div className={classes.bottomContainer}>
                <div className={classes.textContainer}>
                    <Text paragraphClass='textContrast'>{error}</Text>
                </div>
                <div className={classes.buttonContainer}>
                    <SimpleButton
                        variant={SimpleButtonVariant.dark}
                        onClick={() => setIsEnabled(!isEnabled)}
                    >
                        {buttonText}
                    </SimpleButton>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    error: state.app.error,
    info: state.app.info,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal)
