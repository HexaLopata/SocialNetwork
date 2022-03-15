import { setIsFormUploading } from "./actions"

export const sendForm = (dispatch, getAxiosResponse, then, catchError = () => {}) => {
    dispatch(setIsFormUploading(true))
    getAxiosResponse().then((response) => {
        then(response)
    }).catch((error) => {
        catchError(error)
    }).finally(() => {
        dispatch(setIsFormUploading(false))
    })
}