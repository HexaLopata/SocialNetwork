import axios from 'axios'
import { Post } from '../types/Post'

export default class PostService {
    static getFriendsPosts() {
        return axios.get<Post[]>('/api/account/current/friends/posts/')
    }

    static getOwnPosts() {
        return axios.get<Post[]>('/api/account/current/posts/')
    }

    static uploadPost(body: string, imageID: number | null, csrf: string) {
        const data: Post = { body }
        if (imageID !== null) data.image = imageID

        return axios.post<Post>('/api/posts/', data, {
            headers: {
                'X-CSRFToken': csrf,
            },
        })
    }
}
