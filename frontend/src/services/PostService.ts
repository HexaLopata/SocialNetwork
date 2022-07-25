import axios from 'axios'
import { Post } from '../types/Post'

export default class PostService {
    static getFriendsPosts() {
        return axios.get<{ posts: Post[]; liked_posts: { id: number }[] }>(
            '/api/account/current/friends/posts/'
        )
    }

    static getAccountPostsById(id: number) {
        return axios.get<{ posts: Post[]; liked_posts: { id: number }[] }>(
            `/api/account/${id}/posts/`
        )
    }

    static getOwnPosts() {
        return axios.get<{ posts: Post[]; liked_posts: { id: number }[] }>(
            '/api/account/current/posts/'
        )
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

    static likePost(postId: number | undefined, csrf: string) {
        return axios.post(`/api/posts/${postId}/likes/`, null, {
            headers: {
                'X-CSRFToken': csrf,
            },
        })
    }

    static cancelPostLike(postId: number | undefined, csrf: string) {
        return axios.delete(`/api/posts/${postId}/likes/`, {
            headers: {
                'X-CSRFToken': csrf,
            },
        })
    }
}
