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

const EditProfileForm: FC<EditProfileFormProps> = ({
    account,
    updateProfile,
}) => {
    const [firstName, setFirstName] = useState(account?.first_name)
    const [lastName, setLastName] = useState(account?.last_name)
    const [birthdate, setBirthdate] = useState(account?.birthdate)
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
    const [backgroundPictureFile, setBackgroundPictureFile] = useState<File | null>(null)
    const csrf = useCSRF()

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (firstName && lastName && birthdate)
            updateProfile(
                firstName,
                lastName,
                birthdate,
                profilePictureFile,
                backgroundPictureFile,
                csrf
            )
    }

    return (
        <Form onSubmit={submitForm}>
            <h2>Имя: </h2>
            <TextInput
                placeholder='Имя'
                value={firstName}
                setValue={setFirstName}
            />
            <h2>Фамилия: </h2>
            <TextInput
                placeholder='Фамилия'
                value={lastName}
                setValue={setLastName}
            />
            <h2>Дата рождения: </h2>
            <TextInput
                placeholder='DD.MM.YYYY'
                value={birthdate}
                setValue={setBirthdate}
            />
            <h2>Фото профиля: </h2>
            <ImageInput
                setFile={setProfilePictureFile}
                height='200px'
                width='200px'
                margin='15px auto'
                objectFit='cover'
                defaultImageSrc={account?.profile_picture_source || defaultImage}
            />
            <h2>Фото заднего фона: </h2>
            <ImageInput
                setFile={setBackgroundPictureFile}
                height='200px'
                width='350px'
                margin='15px auto'
                objectFit='cover'
                defaultImageSrc={account?.background_picture_source || defaultBackground}
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
