import FileService from '../../../services/FileService'
import PostService from '../../../services/PostService'
import { setError, setIsFormUploading } from '../appReducer/actions'
import { sendRequest } from '../../helpers'

export const SET_ACCOUNT_POSTS = 'SET_ACCOUNT_POSTS'
export const SET_FRIENDS_POSTS = 'SET_FRIENDS_POSTS'
export const ADD_ACCOUNT_POSTS = 'ADD_ACCOUNT_POSTS'
export const ADD_FRIENDS_POSTS = 'ADD_FRIENDS_POSTS'

export const fetchAccountPosts = () => {
    return (dispatch) => {
        sendRequest(dispatch, PostService.getOwnPosts, (response) =>
            dispatch(setAccountPosts(response.data))
        )
    }
}

export const uploadPost = (body, file, csrf) => {
    return (dispatch) => {
        if (!file) {
            uploadPostWithoutImage(dispatch, body, csrf)
            return
        }

        dispatch(setIsFormUploading(true))
        FileService.uploadImage(file, csrf)
            .then((response) => {
                uploadPostWithImageID(dispatch, body, response.data.id, csrf)
            })
            .catch((_) => {
                dispatch(setError('Не удалось загрузить файл'))
            })
        dispatch(setIsFormUploading(false))
    }
}

const uploadPostWithImageID = (dispatch, body, imageID, csrf) => {
    sendRequest(
        dispatch,
        () => PostService.uploadPost(body, imageID, csrf),
        (response) => {
            dispatch(addAccountPosts(response.data))
        }
    )
}

const uploadPostWithoutImage = (dispatch, body, csrf) => {
    uploadPostWithImageID(dispatch, body, null, csrf)
}

export const fetchFriendsPosts = () => {
    return (dispatch) => {
        sendRequest(dispatch, PostService.getFriendsPosts, (response) =>
            dispatch(setFriendsPosts(response.data))
        )
    }
}

export const setAccountPosts = (posts) => {
    return { type: SET_ACCOUNT_POSTS, payload: posts }
}

export const setFriendsPosts = (posts) => {
    return { type: SET_FRIENDS_POSTS, payload: posts }
}

export const addAccountPosts = (post) => {
    return { type: ADD_ACCOUNT_POSTS, payload: post }
}

export const addFriendsPosts = (post) => {
    return { type: ADD_FRIENDS_POSTS, payload: post }
}
