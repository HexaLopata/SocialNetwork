import { setError, setIsFormUploading } from './actions'

export const sendRequest = (
    dispatch,
    getAxiosResponse,
    then,
    catchError = () => {}
) => {
    dispatch(setIsFormUploading(true))
    getAxiosResponse()
        .then((response) => {
            then(response)
        })
        .catch((error) => {
            catchError(error)
            handleError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsFormUploading(false))
        })
}

const handleError = (error, dispatch) => {
    if (!error.response || error.response.status === 500) {
        dispatch(setError('Ошибка сервера'))
    } else if (error.response.data['error']) {
        dispatch(setError(error.response.data['error']))
    } else if (error.response.data['detail']) {
        dispatch(setError(error.response.data['detail']))
    } else {
        let errorMessage = ''
        for (const key in error.response.data) {
            errorMessage += key + ': '
            for (const message of error.response.data[key]) {
                errorMessage += message
            }
            errorMessage += '\n'
        }
        dispatch(setError(errorMessage))
    }
}