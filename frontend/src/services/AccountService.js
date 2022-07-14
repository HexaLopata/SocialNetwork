import axios from 'axios'
import formatDate from '../utils/formatDate'

export default class AccountService {
    static fetchAccount() {
        return axios.get('/api/account/current/')
    }

    static updateAccount(
        firstName,
        lastName,
        birthdate,
        profilePictureID,
        backgroundPictureID,
        csrf
    ) {
        let data = {
            first_name: firstName,
            last_name: lastName,
            birthdate: formatDate(birthdate),
        }

        if (profilePictureID) data.profile_picture = profilePictureID
        if (backgroundPictureID) data.background_picture = backgroundPictureID

        return axios.patch('/api/account/current/', data, {
            headers: { 'X-CSRFToken': csrf },
        })
    }
}
