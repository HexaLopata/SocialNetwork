import AuthService from '../../../services/AuthService'
import { sendRequest } from '../../helpers'
import Cookies from 'universal-cookie'
import { setIniting } from '../appReducer/actions'

export const SET_CSRF = 'SET_CSRF'
export const SET_IS_AUTH = 'SET_IS_AUTH'

export const checkIsAuthenticated = () => {
    return (dispatch) => {
        dispatch(setIniting(true))
        AuthService.checkIsAuthenticated().then((response) => {
            dispatch(setIsAuth(response.data.isAuthenticated))
        }).finally(() => {
            dispatch(setIniting(false))
        })
    }
}

export const fetchCSRF = () => {
    return (dispatch) => {
        AuthService.getCSRF().then((_) => {
            const cookies = new Cookies()
            const csrf = cookies.get('csrftoken')
            dispatch(setCSRF(csrf))
        })
    }
}

export const login = (email, password, csrf) => {
    return (dispatch) => {
        sendRequest(dispatch,
            () => AuthService.login(email, password, csrf),
            () => {
                dispatch(setCSRF(''))
                dispatch(setIsAuth(true))
            }
        )
    }
}

export const register = (username, password, firstName, lastName, birthdate, csrf) => {
    return (dispatch) => {
        sendRequest(dispatch, 
            () => AuthService.register(username, password, firstName, lastName, birthdate, csrf)
        )
    }
}

export const logout = (csrf) => {
    return (dispatch) => {
        sendRequest(dispatch,
            () => AuthService.logout(csrf),
            () => {
                dispatch(setIsAuth(false))
                dispatch(setCSRF(''))
            }
        )
    }
}

export const setIsAuth = (isAuthenticated) => {
    return { type: SET_IS_AUTH, payload: isAuthenticated }
}

export const setCSRF = (csrf) => {
    return { type: SET_CSRF, payload: csrf }
}