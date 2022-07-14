import React, { useState } from 'react'
import TextInput from '../../ui/textInput/TextInput'
import Form from '../../ui/form/Form'
import SubmitButton from '../../ui/submitButton/SubmitButton'
import ImageInput from '../../ui/imageInput/ImageInput'
import { connect } from 'react-redux'
import { updateAccount } from '../../../redux/reducers/accountReducer/actions'
import useCSRF from '../../../hooks/useCSRF'

function EditProfileForm({ account, updateProfile }) {
    const [firstName, setFirstName] = useState(account.first_name)
    const [lastName, setLastName] = useState(account.last_name)
    const [birthdate, setBirthdate] = useState(account.birthdate)
    const [profilePictureFile, setProfilePictureFile] = useState(null)
    const [backgroundPictureFile, setBackgroundPictureFile] = useState(null)
    const csrf = useCSRF()

    const submitForm = (e) => {
        e.preventDefault()
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
                objectFit='contain'
                defaultImageSrc={account.profile_picture_source}
            />
            <h2>Фото заднего фона: </h2>
            <ImageInput
                setFile={setBackgroundPictureFile}
                height='200px'
                width='350px'
                margin='15px auto'
                defaultImageSrc={account.background_picture_source}
            />
            <SubmitButton value='Сохранить' />
        </Form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (
            firstName,
            lastName,
            birthdate,
            profilePictureFile,
            backgroundPictureFile,
            csrf
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
