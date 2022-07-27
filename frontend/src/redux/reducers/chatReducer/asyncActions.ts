import { setCurrentChat, setPrivateChats } from '.'
import ChatService from '../../../services/ChatService'
import { Account } from '../../../types/Account'
import { Chat, Message } from '../../../types/Chat'
import { AppDispatch } from '../../store'

const generalizePrivateChat = (fetchedChat: {
    id: number
    member_1: Account
    member_2: Account
    messages?: Message[]
}): Chat => {
    return {
        id: fetchedChat.id,
        members: [fetchedChat.member_1, fetchedChat.member_2],
        isPrivate: true,
        messages: fetchedChat.messages,
    } as Chat
}

export const fetchPrivateChats = () => {
    return (dispatch: AppDispatch) => {
        ChatService.fetchPrivateChats().then((response) => {
            const chats = response.data.map(generalizePrivateChat)
            dispatch(setPrivateChats(chats))
        })
    }
}

export const fetchCurrentPrivateChat = (accountId: number) => {
    return (dispatch: AppDispatch) => {
        ChatService.fetchPrivateChat(accountId).then((response) => {
            const chat = generalizePrivateChat(response.data)
            dispatch(setCurrentChat(chat))
        })
    }
}
