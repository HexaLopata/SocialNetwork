import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chat, Message } from '../../../types/Chat'

interface ChatState {
    privateChats: Chat[]
    groupChats: Chat[]
    currentChat: Chat | null
    realTimeMessages: Message[]
}

const initialState: ChatState = {
    privateChats: [],
    groupChats: [],
    currentChat: null,
    realTimeMessages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setPrivateChats(state, action: PayloadAction<Chat[]>) {
            state.privateChats = action.payload
        },
        
        setGroupChats(state, action: PayloadAction<Chat[]>) {
            state.groupChats = action.payload
        },

        setCurrentChat(state, action: PayloadAction<Chat>) {
            state.currentChat = action.payload
        },

        addRealTimeMessage(state, action: PayloadAction<Message>) {
            state.realTimeMessages.push(action.payload)
        },

        setRealTimeMessages(state, action: PayloadAction<Message[]>) {
            state.realTimeMessages = action.payload
        },
    },
})

export const {
    setPrivateChats,
    setGroupChats,
    setCurrentChat,
    addRealTimeMessage,
    setRealTimeMessages,
} = chatSlice.actions

export default chatSlice.reducer
