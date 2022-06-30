export const SET_INIT = 'SET_INIT'
export const SET_IS_FORM_UPLOADING = 'SET_IS_FORM_UPLOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_INFO = 'SET_INFO'

export const setIniting = (isIniting) => {
    return { type: SET_INIT, payload: isIniting }
}

export const setIsFormUploading = (isFormUploading) => {
    return { type: SET_IS_FORM_UPLOADING, payload: isFormUploading }
}

export const setError = (message) => {
    return { type: SET_ERROR, payload: message }
}

export const setInfo = (message) => {
    return { type: SET_INFO, payload: message }
}