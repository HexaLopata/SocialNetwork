import { SET_INIT, SET_IS_FORM_UPLOADING } from "./actions"

const initialState = {
    isIniting: true,
    isFormUploading: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_INIT:
            return {...state, isIniting: payload}

        case SET_IS_FORM_UPLOADING:
            return {...state, isFormUploading: payload}

        default:
            return state
    }
}
