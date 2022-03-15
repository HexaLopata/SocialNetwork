import { SET_ACCOUNT } from "./actions"

const initialState = {
    account: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ACCOUNT:
            return { ...state, account: payload }

        default:
            return state
    }
}
