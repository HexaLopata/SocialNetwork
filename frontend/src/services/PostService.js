import axios from 'axios'

export default class PostService {
    static getFriendsPosts() {
        return axios.get('/api/account/current/friends/posts/')
    }

    static getOwnPosts() {
        return axios.get('/api/account/current/posts/')
    }

    static uploadPost(body, imageID, csrf) {
        let data = { body }
        if (imageID) data.image = imageID

        return axios.post('/api/posts/', data, {
            headers: {
                'X-CSRFToken': csrf,
            },
        })
    }
}
