import axios from 'axios';
import formatDate from '../utils/formatDate';

export default class AccountService {
    static fetchAccount() {
        return axios.get('/api/account/current/')
    }

    static updateAccount(firstName, lastName, birthdate, profilePictureID, backgroundPictureID, csrf) {
        return axios.patch(
            '/api/account/current/',
            {
                'first_name': firstName,
                'last_name': lastName,
                'birthdate': formatDate(birthdate),
                'profile_picture': profilePictureID,
                'background_picture': backgroundPictureID
            },
            { headers: { 'X-CSRFToken': csrf } }
        )
    }
}