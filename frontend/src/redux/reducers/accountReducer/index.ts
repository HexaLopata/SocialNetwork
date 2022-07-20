import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Account } from '../../../types/Account'
import { Image } from '../../../types/Image'

interface AccountState {
    account: Account | null
}

const initialState: AccountState = {
    account: null,
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
    },
})

export const { setAccount, setBackgroundPicture, setProfilePicture } = accountSlice.actions

export default accountSlice.reducer
