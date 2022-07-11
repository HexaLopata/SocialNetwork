import PostService from '../../../services/PostService'
import { sendRequest } from '../appReducer/helpers'

export const SET_ACCOUNT_POSTS = 'SET_ACCOUNT_POSTS'
export const SET_FRIENDS_POSTS = 'SET_FRIENDS_POSTS'
export const ADD_ACCOUNT_POSTS = 'ADD_ACCOUNT_POSTS'
export const ADD_FRIENDS_POSTS = 'ADD_FRIENDS_POSTS'

export const fetchAccountPosts = () => {
    return (dispatch) => {
        sendRequest(dispatch,
            PostService.getOwnPosts,
            (response) => dispatch(setAccountPosts(response.data))
        )
    }
}

export const fetchFriendsPosts = () => {
    return (dispatch) => {
        sendRequest(dispatch,
            PostService.getFriendsPosts,
            (response) => dispatch(setFriendsPosts(response.data))
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