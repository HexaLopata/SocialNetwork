import { SET_ERROR, SET_INFO, SET_INIT, SET_IS_FORM_UPLOADING } from "./actions"

const initialState = {
    isIniting: true,
    isFormUploading: false,
    error: '',
    info: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_INIT:
            return { ...state, isIniting: payload }

        case SET_IS_FORM_UPLOADING:
            return { ...state, isFormUploading: payload }

        case SET_ERROR:
            return { ...state, error: payload }

        case SET_INFO:
            return { ...state, info: payload }

        default:
            return state
    }
}
