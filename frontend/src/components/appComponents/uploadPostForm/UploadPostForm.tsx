import React, { FC, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { useImage } from '../../../hooks/useImage'
import { uploadPost } from '../../../redux/reducers/postReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Props } from '../../../types/Props'
import { ErrorText } from '../../ui/errorText/ErrorText'
import FileInput from '../../ui/fileInput/FileInput'
import Form from '../../ui/form/Form'
import { Img } from '../../ui/img/Img'
import { SimpleButtonVariant } from '../../ui/simpleButton/SimpleButton'
import SubmitButton from '../../ui/submitButton/SubmitButton'
import TextArea from '../../ui/textarea/TextArea'
import classes from './UploadPostForm.module.css'

interface UploadPostFormProps extends Props {
    uploadPost: (body: string, file: File | null, csrf: string) => void
}

interface IFormInput {
    body: string
}

const UploadPostForm: FC<UploadPostFormProps> = ({ uploadPost }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormInput>()
    const [image, setImage, file] = useImage()
    const csrf = useCSRF()

    const submitPost = (data: IFormInput) => {
        uploadPost(data.body, file, csrf)
        setValue('body', '')
    }

    return (
        <Form
            padding='15px 25px 25px 25px'
            onSubmit={handleSubmit((data) => submitPost(data))}
        >
            <h2>Опубликовать пост</h2>
            <h4>Содержимое поста</h4>
            <Controller
                name='body'
                control={control}
                rules={{
                    required: 'Поле не должно быть пустым'
                }}
                render={({ field }) => {
                    return (
                        <TextArea
                            height={'200px'}
                            value={field.value}
                            setValue={field.onChange}
                        />
                    )
                }}
            />
            {errors.body && <ErrorText>{errors.body.message || 'Ошибка'}</ErrorText>}
            <h4>Изображение поста</h4>
            <div className={classes.imageContainer}>
                <Img
                    onClick={() => setImage(null)}
                    className={classes.image}
                    src={image}
                    maxWidth='500px'
                    alt=''
                />
            </div>
            <FileInput
                accept='image/*'
                onChange={(e) => setImage(e.target.files)}
                variant={SimpleButtonVariant.dark}
            >
                Загрузить
            </FileInput>
            <SubmitButton value='Опубликовать' />
        </Form>
    )
}
const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        uploadPost: (body: string, file: File | null, csrf: string) => {
            dispatch(uploadPost(body, file, csrf))
        },
    }
}

export default connect(null, mapDispatchToProps)(UploadPostForm)
