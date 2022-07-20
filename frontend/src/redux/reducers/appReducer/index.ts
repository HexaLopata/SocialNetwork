import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    isIniting: boolean,
    isFormUploading: boolean,
    error: string,
    info: string
}

const initialState: AppState = {
    isIniting: true,
    isFormUploading: false,
    error: '',
    info: ''
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsIniting: (state, action: PayloadAction<boolean>) => {
            state.isIniting = action.payload
        },

        setIsFormUploading: (state, action: PayloadAction<boolean>) => {
            state.isFormUploading = action.payload
        },
            
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },

        setInfo: (state, action: PayloadAction<string>) => {
            state.info = action.payload
        },
    }
})

export const { setIsIniting, setIsFormUploading, setError, setInfo } = appSlice.actions
export default appSlice.reducer