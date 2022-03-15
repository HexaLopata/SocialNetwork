import { SET_CSRF, SET_IS_AUTH } from "./actions"

const initialState = {
    isAuthenticated: false,
    csrf: ''
}    

export const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_IS_AUTH:
            return {...state, isAuthenticated: payload}

        case SET_CSRF:
            return {...state, csrf: payload}

        default:
            return state
    }
}