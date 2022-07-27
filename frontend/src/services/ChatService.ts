import axios from 'axios'
import { Account } from '../types/Account'
import { Message } from '../types/Chat'

export default class ChatService {
    static fetchPrivateChat(accountId: number) {
        return axios.get<{
            id: number
            member_1: Account
            member_2: Account
            messages: Message[]
        }>(`/api/account/current/chats/private/${accountId}/`)
    }

    static fetchPrivateChats() {
        return axios.get<
            {
                id: number
                member_1: Account
                member_2: Account
            }[]
        >('/api/account/current/chats/private/')
    }
}
