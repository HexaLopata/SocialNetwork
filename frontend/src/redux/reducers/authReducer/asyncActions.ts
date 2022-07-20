import AuthService from '../../../services/AuthService'
import { sendRequest } from '../../helpers'
import Cookies from 'universal-cookie'
import { AppDispatch } from '../../store'
import { setIsAuth, setCSRF } from '.'
import { setIsIniting } from '../appReducer'

export const checkIsAuthenticated = () => {
    return (dispatch: AppDispatch) => {
        dispatch(setIsIniting(true))
        AuthService.checkIsAuthenticated()
            .then((response) => {
                dispatch(setIsAuth(response.data.isAuthenticated))
            })
            .finally(() => {
                dispatch(setIsIniting(false))
            })
    }
}

export const fetchCSRF = () => {
    return (dispatch: AppDispatch) => {
        AuthService.getCSRF().then(() => {
            const cookies = new Cookies()
            const csrf = cookies.get('csrftoken')
            dispatch(setCSRF(csrf))
        })
    }
}

export const login = (email: string, password: string, csrf: string) => {
    return (dispatch: AppDispatch) => {
        sendRequest(
            dispatch,
            () => AuthService.login(email, password, csrf),
            () => {
                dispatch(setCSRF(''))
                dispatch(setIsAuth(true))
            }
        )
    }
}

export const register = (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    birthdate: string,
    csrf: string
) => {
    return (dispatch: AppDispatch) => {
        sendRequest(dispatch, () =>
            AuthService.register(
                username,
                password,
                firstName,
                lastName,
                birthdate,
                csrf
            )
        )
    }
}

export const logout = (csrf: string) => {
    return (dispatch: AppDispatch) => {
        sendRequest(
            dispatch,
            () => AuthService.logout(csrf),
            () => {
                dispatch(setIsAuth(false))
                dispatch(setCSRF(''))
            }
        )
    }
}
