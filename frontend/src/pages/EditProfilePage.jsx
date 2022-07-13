import React, { useState } from 'react'
import TextInput from '../components/ui/textInput/TextInput'
import Form from '../components/ui/form/Form'
import classes from './EditProfilePage.module.css'
import SubmitButton from '../components/ui/submitButton/SubmitButton'
import { connect } from 'react-redux'

function EditProfilePage({ account }) {
    const [firstName, setFirstName] = useState(account.first_name)
    const [lastName, setLastName] = useState(account.last_name)
    const [birthdate, setBirthdate] = useState(account.birthdate)

    return (
        <div className={classes.editPageContainer}>
            <Form onSubmit={(e) => e.preventDefault()}>
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
                <div className={classes.imageContainer}>
                    <img
                        src={account.profile_picture_source}
                        alt='Изображение'
                        className={classes.profilePicture}
                    />
                </div>
                <h2>Фото заднего фона: </h2>
                <div
                    className={
                        classes.imageContainer +
                        ' ' +
                        classes.backgroundImageContainer
                    }
                >
                    <img
                        src={account.background_picture_source}
                        alt='Изображение'
                        className={classes.profilePicture}
                    />
                </div>
                <SubmitButton value='Сохранить' />
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    account: state.account.account,
})

export default connect(mapStateToProps)(EditProfilePage)
