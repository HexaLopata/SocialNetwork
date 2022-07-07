import axios from "axios";

export default class PostService {
    static getFriendsPosts() {
        return axios.get('/api/account/current/friends/posts/')
    }

    static getOwnPosts() {
        return axios.get('/api/account/current/posts/')
    }
} 