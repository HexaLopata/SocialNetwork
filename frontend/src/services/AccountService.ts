import axios from 'axios'
import { Account } from '../types/Account'
import { FriendRequest } from '../types/FriendRequest'
import formatDate from '../utils/formatDate'

export default class AccountService {
    static fetchAccount() {
        return axios.get('/api/account/current/')
    }

    static updateAccount(
        firstName: string,
        lastName: string,
        birthdate: string,
        profilePictureID: number | null,
        backgroundPictureID: number | null,
        csrf: string
    ) {
        const data: Account = {
            first_name: firstName,
            last_name: lastName,
            birthdate: formatDate(birthdate),
        }

        if (profilePictureID !== null) data.profile_picture = profilePictureID
        if (backgroundPictureID !== null)
            data.background_picture = backgroundPictureID

        return axios.patch('/api/account/current/', data, {
            headers: { 'X-CSRFToken': csrf },
        })
    }

    static fetchFriends() {
        return axios.get<Account[]>('/api/account/current/friends/')
    }

    static fetchFriendRequests() {
        return axios.get<FriendRequest[]>('/api/account/current/requests/')
    }

    static addFriend(friendId: number, csrf: string) {
        return axios.post(
            '/api/account/current/friends/',
            { friend_account: friendId },
            {
                headers: { 'X-CSRFToken': csrf },
            }
        )
    }

    static deleteFriend(friendId: number, csrf: string) {
        return axios.request({
            method: 'DELETE',
            url: '/api/account/current/friends/',
            data: { friend_account: friendId },
            headers: {
                'X-CSRFToken': csrf,
            },
        })
    }

    static deleteFriendRequest(requestId: number, csrf: string) {
        return axios.delete(`/api/requests/${requestId}/`, {
            headers: { 'X-CSRFToken': csrf },
        })
    }
}
