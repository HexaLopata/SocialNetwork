import { Account } from './Account'

export interface FriendRequest {
    id?: number
    to_account?: Account | number
    from_account: Account | number
}
