import React, { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { register } from '../../../redux/reducers/authReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Props } from '../../../types/Props'
import Form from '../../ui/form/Form'
import SubmitButton from '../../ui/submitButton/SubmitButton'
import TextInput from '../../ui/textInput/TextInput'
import { datePattern } from '../../../global/regExPatterns'
import { ErrorText } from '../../ui/errorText/ErrorText'

interface RegisterFormProps extends Props {
    register: (
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        birthdate: string,
        csrf: string
    ) => void
}

interface IFormInput {
    login: string
    firstname: string
    lastName: string
    birthdate: string
    password: string
    rePassword: string
}

export const RegisterForm: FC<RegisterFormProps> = ({ register }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IFormInput>()
    const csrf = useCSRF()

    const sendForm: SubmitHandler<IFormInput> = ({
        login,
        password,
        firstname,
        lastName,
        birthdate,
    }) => {
        register(login, password, firstname, lastName, birthdate, csrf)
    }

    return (
        <Form autoComplete='off' onSubmit={handleSubmit(sendForm)}>
            <h1>Регистрация</h1>
            <Controller
                name='login'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                    maxLength: {
                        value: 150,
                        message: 'Имя пользователя слишком большое',
                    },
                }}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='Логин'
                            value={field.value}
                            setValue={field.onChange}
                        />
                    )
                }}
            />
            {errors.login && (
                <ErrorText>{errors.login.message || 'Ошибка'}</ErrorText>
            )}
            <Controller
                name='firstname'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                }}
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
            {errors.firstname && (
                <ErrorText>{errors.firstname.message || 'Ошибка'}</ErrorText>
            )}
            <Controller
                name='lastName'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                }}
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
            <Controller
                name='birthdate'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                    pattern: {
                        value: datePattern,
                        message: 'Дата должна быть в формате DD.MM.YYYY',
                    },
                }}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='Дата рождения: DD.MM.YYYY'
                            value={field.value}
                            setValue={field.onChange}
                        />
                    )
                }}
            />
            {errors.birthdate && (
                <ErrorText>{errors.birthdate.message || 'Ошибка'}</ErrorText>
            )}
            <Controller
                name='password'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                }}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='Пароль'
                            password
                            value={field.value}
                            setValue={field.onChange}
                            autoComplete='new-password'
                        />
                    )
                }}
            />
            {errors.password && (
                <ErrorText>{errors.password.message || 'Ошибка'}</ErrorText>
            )}
            <Controller
                name='rePassword'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                    validate: (v) =>
                        v === getValues('password')
                            ? true
                            : 'Пароли не совпадают',
                }}
                render={({ field }) => {
                    return (
                        <TextInput
                            placeholder='Повтор пароля'
                            password
                            value={field.value}
                            setValue={field.onChange}
                            autoComplete='new-password'
                        />
                    )
                }}
            />
            {errors.rePassword && (
                <ErrorText>{errors.rePassword.message || 'Ошибка'}</ErrorText>
            )}
            <SubmitButton value='Отправить' />
        </Form>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        register: (
            username: string,
            password: string,
            firstName: string,
            lastName: string,
            birthdate: string,
            csrf: string
        ) =>
            dispatch(
                register(
                    username,
                    password,
                    firstName,
                    lastName,
                    birthdate,
                    csrf
                )
            ),
    }
}

export default connect(null, mapDispatchToProps)(RegisterForm)
