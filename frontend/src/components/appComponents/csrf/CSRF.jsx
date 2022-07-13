import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCSRF } from '../../../redux/reducers/authReducer/actions'

const CSRF = ({ csrf, fetchCSRF }) => {
    useEffect(() => {
        if (csrf.trim() === '') {
            fetchCSRF()
        }
    }, [csrf, fetchCSRF])
    return ( <></> )
}

const mapStateToProps = (state, ownProps) => {
    const { csrf } = state.auth
    return { csrf, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCSRF: () => dispatch(fetchCSRF())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSRF)