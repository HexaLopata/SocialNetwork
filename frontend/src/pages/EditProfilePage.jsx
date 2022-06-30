import React from 'react'
import TextInput from '../components/textInput/TextInput'
import Form from '../components/form/Form'
import classes from './EditProfilePage.module.css'
import SubmitButton from '../components/submitButton/SubmitButton'

export default function EditProfilePage({ firstName, lastName, birthdate, profilePicture, backgroundPicture }) {
  return (
    <div className={classes.editPageContainer}>
      <Form onSubmit={e => e.preventDefault()}>
        <h2>Имя: </h2>
        <TextInput
          placeholder='Имя'
          defaultValue={firstName}
        />
        <h2>Фамилия: </h2>
        <TextInput
          placeholder='Фамилия'
          defaultValue={lastName}
        />
        <h2>Дата рождения: </h2>
        <TextInput
          placeholder='DD.MM.YYYY'
          defaultValue={birthdate}
        />
        <h2>Фото профиля: </h2>
        <div className={classes.imageContainer}>
          <img
            src={profilePicture}
            alt='Изображение'
            className={classes.profilePicture}
          />
        </div>
        <h2>Фото заднего фона: </h2>
        <div className={classes.imageContainer + ' ' + classes.backgroundImageContainer}>
          <img
            src={backgroundPicture}
            alt='Изображение'
            className={classes.profilePicture}
          />
        </div>
        <SubmitButton value='Сохранить' />
      </Form>
    </div>
  )
}
