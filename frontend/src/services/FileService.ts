import axios from 'axios'
import { Image } from '../types/Image'

interface NamedImage extends Image {
    name: string
}

interface NamedFile {
    name: string
    file: File | null
}

export default class FileService {
    static uploadImage(file: File | null, csrf: string) {
        const formData = new FormData()
        if (file !== null) formData.append('source', file)

        return axios.post<Image>('/api/images/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': csrf,
            },
        })
    }

    static uploadAllImages(filesWithNames: NamedFile[], csrf: string) {
        return Promise.all(
            filesWithNames.map((f) => {
                return new Promise<NamedImage>((resolve, reject) => {
                    FileService.uploadImage(f.file, csrf)
                        .then((response) => {
                            const image = {
                                id: response.data.id,
                                source: response.data.source,
                            }
                            const name = f.name
                            resolve({ name, ...image })
                        })
                        .catch((error) => {
                            reject(error)
                        })
                })
            })
        )
    }
}
