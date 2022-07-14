import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { useImage } from '../../../hooks/useImage'
import { uploadPost } from '../../../redux/reducers/postReducer/actions'
import FileInput from '../../ui/fileInput/FileInput'
import Form from '../../ui/form/Form'
import SubmitButton from '../../ui/submitButton/SubmitButton'
import TextArea from '../../ui/textarea/TextArea'
import classes from './UploadPostForm.module.css'

function UploadPostForm({ uploadPost }) {
    const [body, setBody] = useState('')
    const [image, setImage, file] = useImage()
    const csrf = useCSRF()

    const submitPost = useCallback(
        (e) => {
            e.preventDefault()
            uploadPost(body, file, csrf)
        },
        [body, file, csrf, uploadPost]
    )

    return (
        <Form padding='15px 25px 25px 25px' onSubmit={submitPost}>
            <h2>Опубликовать пост</h2>
            <h4>Содержимое поста</h4>
            <TextArea height={'200px'} value={body} setValue={setBody} />
            <h4>Изображение поста</h4>
            <div className={classes.imageContainer}>
                <img
                    onClick={() => setImage(null)}
                    className={classes.image}
                    src={image}
                    alt=''
                />
            </div>
            <FileInput
                accept='image/*'
                onChange={(e) => setImage(e.target.files)}
                variant='dark'
            >
                Загрузить
            </FileInput>
            <SubmitButton value='Опубликовать' />
        </Form>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadPost: (body, file, csrf) => {
            dispatch(uploadPost(body, file, csrf))
        },
    }
}

export default connect(null, mapDispatchToProps)(UploadPostForm)
