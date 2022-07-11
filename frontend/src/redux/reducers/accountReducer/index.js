import { SET_ACCOUNT } from './actions'

const initialState = {
    account: null
}

const accountReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ACCOUNT:
            return { ...state, account: payload }

        default:
            return state
    }
}

export default accountReducer
