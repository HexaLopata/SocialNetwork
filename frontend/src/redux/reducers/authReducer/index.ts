import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean,
    csrf: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    csrf: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },

        setCSRF: (state, action: PayloadAction<string>) => {
            state.csrf = action.payload
        },
    }
})

export const { setIsAuth, setCSRF } = authSlice.actions

export default authSlice.reducer
