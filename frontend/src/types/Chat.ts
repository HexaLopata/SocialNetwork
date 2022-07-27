import { Account } from './Account'

export interface Chat {
    id?: number
    messages?: Message[]
    members: Account[]
    isPrivate: boolean
}

export interface Message {
    id?: number
    author?: Account
    body: string
    date?: string
    image?: number
    image_source?: string
}
