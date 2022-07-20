import { AxiosError, AxiosResponse } from 'axios'
import FileService from '../services/FileService'
import { Image as Image } from '../types/Image'
import { setIsFormUploading, setError } from './reducers/appReducer'
import { AppDispatch } from './store'

export const sendRequest = <T>(
    dispatch: AppDispatch,
    getAxiosResponse: () => Promise<AxiosResponse<T>>,
    then?: (response: AxiosResponse<T>) => void,
    catchError?: (error: AxiosError) => void
) => {
    dispatch(setIsFormUploading(true))
    getAxiosResponse()
        .then((response) => {
            if (then) then(response)
        })
        .catch((error) => {
            if (catchError) catchError(error)
            handleError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsFormUploading(false))
        })
}

export const handleError = (error: AxiosError, dispatch: AppDispatch) => {
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

interface NamedImage extends Image {
    name: string
}

interface NamedFile {
    name: string
    file: File | null
}

export const uploadAllImages = (filesWithNames: NamedFile[], csrf: string) => {
    return Promise.all(
        filesWithNames.map((f) => {
            return new Promise<NamedImage>((resolve, reject) => {
                FileService.uploadImage(f.file, csrf)
                    .then((response) => {
                        const image = {
                            id: response.data.id,
                            source: response.data.source,
                        }
                        const name = f.name
                        resolve({ name, ...image })
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        })
    )
}
