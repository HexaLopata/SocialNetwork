import axios from 'axios'
import { Image } from '../types/Image'

export default class FileService {
    static uploadImage(file: File | null, csrf: string) {
        const formData = new FormData()
        if(file !== null)
            formData.append('source', file)

        return axios.post<Image>('/api/images/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': csrf,
            },
        })
    }
}
