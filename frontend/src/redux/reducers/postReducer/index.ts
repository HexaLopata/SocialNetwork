import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { Post } from '../../../types/Post'

interface PostState {
    accountPosts: Post[]
    friendsPosts: Post[]
    observedAccountPosts: Post[]
}

const initialState: PostState = {
    accountPosts: [],
    friendsPosts: [],
    observedAccountPosts: [],
}

const setLike = (
    state: WritableDraft<PostState>,
    action: PayloadAction<Post>,
    like: boolean
) => {
    const postLists = [
        state.friendsPosts,
        state.accountPosts,
        state.observedAccountPosts,
    ]
    for (let i = 0; i < postLists.length; i++) {
        const post = postLists[i].find((p) => p.id == action.payload.id)
        if (post) post.liked = like
    }
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setAccountPosts: (state, action: PayloadAction<Post[]>) => {
            state.accountPosts = action.payload
        },

        setObservedAccountPosts: (state, action: PayloadAction<Post[]>) => {
            state.observedAccountPosts = action.payload
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
            setLike(state, action, true)
        },

        setCancelLikePost: (state, action: PayloadAction<Post>) => {
            setLike(state, action, false)
        },
    },
})

export const {
    setAccountPosts,
    setFriendsPosts,
    addAccountPosts,
    addFriendsPosts,
    setLikePost,
    setCancelLikePost,
    setObservedAccountPosts,
} = postSlice.actions

export default postSlice.reducer
