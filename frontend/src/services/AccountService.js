import axios from 'axios';

export default class AccountService {
    static fetchAccount() {
        return axios.get('/api/account/current/')
    }
}