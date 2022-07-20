import FileService from '../../../services/FileService'
import PostService from '../../../services/PostService'
import { sendRequest } from '../../helpers'
import { AppDispatch } from '../../store'
import { addAccountPosts, setAccountPosts, setFriendsPosts } from '.'
import { setError, setIsFormUploading } from '../appReducer'
import { Post } from '../../../types/Post'

export const fetchAccountPosts = () => {
    return (dispatch: AppDispatch) => {
        sendRequest(dispatch, PostService.getOwnPosts, (response) =>
            dispatch(setAccountPosts(response.data))
        )
    }
}

export const uploadPost = (body: string, file: File | null, csrf: string) => {
    return (dispatch: AppDispatch) => {
        if (!file) {
            uploadPostWithoutImage(dispatch, body, csrf)
            return
        }

        dispatch(setIsFormUploading(true))
        FileService.uploadImage(file, csrf)
            .then((response) => {
                uploadPostWithImageID(dispatch, body, response.data.id, csrf)
            })
            .catch(() => {
                dispatch(setError('Не удалось загрузить файл'))
            })
        dispatch(setIsFormUploading(false))
    }
}

const uploadPostWithImageID = (
    dispatch: AppDispatch,
    body: string,
    imageID: number | null,
    csrf: string
) => {
    sendRequest<Post>(
        dispatch,
        () => PostService.uploadPost(body, imageID, csrf),
        (response) => {
            dispatch(addAccountPosts([response.data]))
        }
    )
}

const uploadPostWithoutImage = (dispatch: AppDispatch, body: string, csrf: string) => {
    uploadPostWithImageID(dispatch, body, null, csrf)
}

export const fetchFriendsPosts = () => {
    return (dispatch: AppDispatch) => {
        sendRequest(dispatch, PostService.getFriendsPosts, (response) =>
            dispatch(setFriendsPosts(response.data))
        )
    }
}
