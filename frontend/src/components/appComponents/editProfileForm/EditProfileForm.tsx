import React, { FC, useState } from 'react'
import TextInput from '../../ui/textInput/TextInput'
import Form from '../../ui/form/Form'
import SubmitButton from '../../ui/submitButton/SubmitButton'
import ImageInput from '../../ui/imageInput/ImageInput'
import { connect } from 'react-redux'
import { updateAccount } from '../../../redux/reducers/accountReducer/asyncActions'
import useCSRF from '../../../hooks/useCSRF'
import { Props } from '../../../types/Props'
import { Account } from '../../../types/Account'
import { TDispatch } from '../../../redux/store'
import defaultImage from '../../../global/default-profile-icon.jpg'
import defaultBackground from '../../../global/no-image.png'
import { formatDateToClientFormat } from '../../../utils/formatDate'
import { Controller, useForm } from 'react-hook-form'
import { datePattern } from '../../../global/regExPatterns'
import { ErrorText } from '../../ui/errorText/ErrorText'

interface EditProfileFormProps extends Props {
    account: Account | null
    updateProfile: (
        firstName: string,
        lastName: string,
        birthdate: string,
        profilePictureFile: File | null,
        backgroundPictureFile: File | null,
        csrf: string
    ) => void
}

interface IFormInput {
    firstName: string
    lastName: string
    birthdate: string
}

const EditProfileForm: FC<EditProfileFormProps> = ({
    account,
    updateProfile,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            firstName: account?.first_name,
            lastName: account?.last_name,
            birthdate: account?.birthdate && formatDateToClientFormat(account?.birthdate),
        },
    })
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
        null
    )
    const [backgroundPictureFile, setBackgroundPictureFile] =
        useState<File | null>(null)
    const csrf = useCSRF()

    const submitForm = (data: IFormInput) => {
        updateProfile(
            data.firstName,
            data.lastName,
            data.birthdate,
            profilePictureFile,
            backgroundPictureFile,
            csrf
        )
    }

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <h2>Имя: </h2>
            <Controller
                name='firstName'
                rules={{
                    required: 'Поле не должно быть пустым',
                }}
                control={control}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='Имя'
                            value={field.value}
                            setValue={field.onChange}
                        />
                    )
                }}
            />
            {errors.firstName && (
                <ErrorText>{errors.firstName.message || 'Ошибка'}</ErrorText>
            )}
            <h2>Фамилия: </h2>
            <Controller
                name='lastName'
                rules={{
                    required: 'Поле не должно быть пустым',
                }}
                control={control}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='Фамилия'
                            value={field.value}
                            setValue={field.onChange}
                        />
                    )
                }}
            />
            {errors.lastName && (
                <ErrorText>{errors.lastName.message || 'Ошибка'}</ErrorText>
            )}

            <h2>Дата рождения: </h2>
            <Controller
                name='birthdate'
                rules={{
                    required: 'Поле не должно быть пустым',
                    pattern: {
                        value: datePattern,
                        message: 'Дата должна быть в формате DD.MM.YYYY',
                    },
                }}
                control={control}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='DD.MM.YYYY'
                            value={field.value}
                            setValue={field.onChange}
                        />
                    )
                }}
            />
            {errors.birthdate && (
                <ErrorText>{errors.birthdate.message || 'Ошибка'}</ErrorText>
            )}

            <h2>Фото профиля: </h2>
            <ImageInput
                setFile={setProfilePictureFile}
                height='200px'
                width='200px'
                margin='15px auto'
                objectFit='cover'
                defaultImageSrc={
                    account?.profile_picture_source || defaultImage
                }
            />
            <h2>Фото заднего фона: </h2>
            <ImageInput
                setFile={setBackgroundPictureFile}
                height='200px'
                width='350px'
                margin='15px auto'
                objectFit='cover'
                defaultImageSrc={
                    account?.background_picture_source || defaultBackground
                }
            />
            <SubmitButton value='Сохранить' />
        </Form>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        updateProfile: (
            firstName: string,
            lastName: string,
            birthdate: string,
            profilePictureFile: File | null,
            backgroundPictureFile: File | null,
            csrf: string
        ) => {
            dispatch(
                updateAccount(
                    firstName,
                    lastName,
                    birthdate,
                    profilePictureFile,
                    backgroundPictureFile,
                    csrf
                )
            )
        },
    }
}

export default connect(null, mapDispatchToProps)(EditProfileForm)
