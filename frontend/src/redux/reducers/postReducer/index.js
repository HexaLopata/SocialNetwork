import { SET_ACCOUNT_POSTS, SET_FRIENDS_POSTS, ADD_ACCOUNT_POSTS, ADD_FRIENDS_POSTS } from "./actions"

const initialState = {
    accountPosts: [],
    friendsPosts: []
}

export const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ACCOUNT_POSTS:
            return { ...state, accountPosts: payload }

        case SET_FRIENDS_POSTS:
            return { ...state, friendsPosts: payload }

        case ADD_ACCOUNT_POSTS:
            return { ...state, accountPosts: [...state.accountPosts, payload] }

        case ADD_FRIENDS_POSTS:
            return { ...state, friendsPosts: [...state.friendsPosts, payload]  }

        default:
            return state
    }
}