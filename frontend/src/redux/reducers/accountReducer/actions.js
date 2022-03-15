import AccountService from '../../../services/AccountService'

export const SET_ACCOUNT = 'SET_ACCOUNT'

export const fetchAccount = () => {
    return (dispatch) => {
        AccountService.fetchAccount().then((response => {
            dispatch(setAccount(response.data))
        }))
    }
}

export const setAccount = (account) => {
    return { type: SET_ACCOUNT, payload: account }
} 