import FileService from '../../../services/FileService'
import PostService from '../../../services/PostService'
import { handleError, sendForm } from '../../helpers'
import { AppDispatch } from '../../store'
import {
    addAccountPosts,
    setAccountPosts,
    setCancelLikePost,
    setFriendsPosts,
    setLikePost,
    setObservedAccountPosts,
} from '.'
import { setError, setIsFormUploading } from '../appReducer'
import { Post } from '../../../types/Post'

export const fetchAccountPosts = () => {
    return (dispatch: AppDispatch) => {
        sendForm(dispatch, PostService.getOwnPosts, (response) => {
            const posts = setPostLikes(response.data)
            dispatch(setAccountPosts(posts))
        })
    }
}

export const fetchAccountPostsById = (id: number) => {
    return (dispatch: AppDispatch) => {
        sendForm(dispatch, () => PostService.getAccountPostsById(id), (response) => {
            const posts = setPostLikes(response.data)
            dispatch(setObservedAccountPosts(posts))
        })
    }
}

const setPostLikes = (data: {
    posts: Post[]
    liked_posts: { id: number }[]
}) => {
    const posts = data['posts']
    const likedPosts = data['liked_posts']
    for (let index = 0; index < posts.length; index++) {
        posts[index].liked =
            likedPosts.findIndex((p) => p.id === posts[index].id) !== -1
    }
    return posts
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
    sendForm<Post>(
        dispatch,
        () => PostService.uploadPost(body, imageID, csrf),
        (response) => {
            dispatch(addAccountPosts([response.data]))
        }
    )
}

const uploadPostWithoutImage = (
    dispatch: AppDispatch,
    body: string,
    csrf: string
) => {
    uploadPostWithImageID(dispatch, body, null, csrf)
}

export const fetchFriendsPosts = () => {
    return (dispatch: AppDispatch) => {
        sendForm(dispatch, PostService.getFriendsPosts, (response) => {
            const posts = setPostLikes(response.data)
            dispatch(setFriendsPosts(posts))
        })
    }
}

export const likePost = (post: Post, csrf: string) => {
    return (dispatch: AppDispatch) => {
        PostService.likePost(post.id, csrf)
            .then(() => {
                dispatch(setLikePost(post))
            })
            .catch((error) => {
                handleError(error, dispatch)
            })
    }
}

export const cancelPostLike = (post: Post, csrf: string) => {
    return (dispatch: AppDispatch) => {
        PostService.cancelPostLike(post.id, csrf)
            .then(() => {
                dispatch(setCancelLikePost(post))
            })
            .catch((error) => {
                handleError(error, dispatch)
            })
    }
}
