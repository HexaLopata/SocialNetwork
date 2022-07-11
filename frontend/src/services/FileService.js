import axios from 'axios';

export default class FileService {
    static uploadImage(file, csrf) {
        const formData = new FormData()
        formData.append('source', file)

        return axios.post(
            '/api/images/',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data', 'X-CSRFToken': csrf } }
        );
    }
}