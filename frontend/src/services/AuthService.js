import axios from 'axios';

export default class AuthService {
    static checkIsAuthenticated() {
        return axios.get('/api/auth/isAuthenticated/')
    }

    static login(username, password, csrf) {
        return axios.post('/api/auth/login/', {
            'username': username,
            'password': password
        }, { headers:  {'X-CSRFToken': csrf } })  
    }

    static register(username, password, csrf) {
        return axios.post('/api/auth/register/', {
            'username': username,
            'password': password
        }, { headers:  {'X-CSRFToken': csrf } })  
    }

    static logout(csrf) {
        return axios.post('/api/auth/logout/', {}, { headers: { 'X-CSRFToken': csrf } })
    }

    static getCSRF() {
        return axios.get('/api/auth/csrf/')
    }
}