import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../../types/Post'

interface PostState {
    accountPosts: Post[]
    friendsPosts: Post[]
}

const initialState: PostState = {
    accountPosts: [],
    friendsPosts: [],
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setAccountPosts: (state, action: PayloadAction<Post[]>) => {
            state.accountPosts = action.payload
        },

        setFriendsPosts: (state, action: PayloadAction<Post[]>) => {
            state.friendsPosts = action.payload
        },

        addAccountPosts: (state, action: PayloadAction<Post[]>) => {
            state.accountPosts = state.accountPosts.concat(action.payload)
        },

        addFriendsPosts: (state, action: PayloadAction<Post[]>) => {
            state.friendsPosts = state.friendsPosts.concat(action.payload)
        },

        setLikePost: (state, action: PayloadAction<Post>) => {
            let post = state.accountPosts.find(
                (p) => (p.id == action.payload.id)
            )
            if (post) {
                post.liked = true
            } else {
                post = state.friendsPosts.find(
                    (p) => (p.id == action.payload.id)
                )
                if (post) post.liked = true
            }
        },

        setCancelLikePost: (state, action: PayloadAction<Post>) => {
            let post = state.accountPosts.find(
                (p) => (p.id == action.payload.id)
            )
            if (post) {
                post.liked = false
            } else {
                post = state.friendsPosts.find(
                    (p) => (p.id == action.payload.id)
                )
                if (post) post.liked = false
            }
        },
    },
})

export const {
    setAccountPosts,
    setFriendsPosts,
    addAccountPosts,
    addFriendsPosts,
    setLikePost,
    setCancelLikePost
} = postSlice.actions

export default postSlice.reducer
