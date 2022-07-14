import {
    SET_ACCOUNT,
    SET_BACKGROUND_PICTURE,
    SET_PROFILE_PICTURE,
} from './actions'

const initialState = {
    account: null,
}

const accountReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ACCOUNT:
            return { ...state, account: payload }

        case SET_BACKGROUND_PICTURE:
            return {
                ...state,
                account: {
                    ...state.account,
                    background_picture: payload.id,
                    background_picture_source: payload.source,
                },
            }
        case SET_PROFILE_PICTURE:
            return {
                ...state,
                account: {
                    ...state.account,
                    profile_picture: payload.id,
                    profile_picture_source: payload.source,
                },
            }

        default:
            return state
    }
}

export default accountReducer
