import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Account } from '../../../types/Account'
import { FriendRequest } from '../../../types/FriendRequest'
import { Image } from '../../../types/Image'

interface AccountState {
    account: Account | null
    friends: Account[]
    friendRequests: FriendRequest[]
    observedAccount: Account | null
}

const initialState: AccountState = {
    account: null,
    friends: [],
    friendRequests: [],
    observedAccount: null,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<Account>) => {
            state.account = action.payload
        },

        setBackgroundPicture: (state, action: PayloadAction<Image>) => {
            if (state.account) {
                state.account.background_picture = action.payload.id
                state.account.background_picture_source = action.payload.source
            }
        },

        setProfilePicture: (state, action: PayloadAction<Image>) => {
            if (state.account) {
                state.account.profile_picture = action.payload.id
                state.account.profile_picture_source = action.payload.source
            }
        },

        setObservedAccount: (state, action: PayloadAction<Account | null>) => {
            state.observedAccount = action.payload
        },

        setFriends: (state, action: PayloadAction<Account[]>) => {
            state.friends = action.payload
        },

        setRequests: (state, action: PayloadAction<FriendRequest[]>) => {
            state.friendRequests = action.payload
        },

        deleteRequest: (state, action: PayloadAction<FriendRequest>) => {
            const index = state.friendRequests.findIndex(
                (a) => a.id === action.payload.id
            )
            if (index !== -1) state.friendRequests.splice(index, 1)
        },

        deleteFriend: (state, action: PayloadAction<Account>) => {
            const index = state.friends.findIndex(
                (a) => a.id === action.payload.id
            )
            if (index !== -1) state.friends.splice(index, 1)
        },

        addFriend: (state, action: PayloadAction<Account>) => {
            state.friends.push(action.payload)
        },

        addRequest: (state, action: PayloadAction<FriendRequest>) => {
            state.friendRequests.push(action.payload)
        },
    },
})

export const {
    setAccount,
    setBackgroundPicture,
    setProfilePicture,
    deleteRequest,
    addFriend,
    setRequests,
    setFriends,
    deleteFriend,
    addRequest,
    setObservedAccount
} = accountSlice.actions

export default accountSlice.reducer
