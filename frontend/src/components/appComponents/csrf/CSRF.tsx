import React, { FC } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCSRF } from '../../../redux/reducers/authReducer/asyncActions'
import { RootState, TDispatch } from '../../../redux/store'
import { Props } from '../../../types/Props'

interface CSRFProps extends Props {
    csrf: string
    fetchCSRF: () => void
}

const CSRF: FC<CSRFProps> = ({ csrf, fetchCSRF }) => {
    useEffect(() => {
        if (csrf.trim() === '') {
            fetchCSRF()
        }
    }, [csrf, fetchCSRF])
    return ( <></> )
}

const mapStateToProps = (state: RootState) => {
    const { csrf } = state.auth
    return { csrf }
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchCSRF: () => dispatch(fetchCSRF())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSRF)