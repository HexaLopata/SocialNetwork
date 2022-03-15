export const SET_INIT = 'SET_INIT'
export const SET_IS_FORM_UPLOADING = 'SET_IS_FORM_UPLOADING'

export const setIniting = (isIniting) => {
    return { type: SET_INIT, payload: isIniting }
}

export const setIsFormUploading = (isFormUploading) => {
    return { type: SET_IS_FORM_UPLOADING, payload: isFormUploading }
}