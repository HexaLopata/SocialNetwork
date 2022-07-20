import axios from 'axios'
import { Account } from '../types/Account'
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
}
