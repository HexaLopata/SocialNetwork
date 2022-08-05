import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { login } from '../../../redux/reducers/authReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Props } from '../../../types/Props'
import Form from '../../ui/form/Form'
import SubmitButton from '../../ui/submitButton/SubmitButton'
import TextInput from '../../ui/textInput/TextInput'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ErrorText } from '../../ui/errorText/ErrorText'

interface LoginFormProps extends Props {
    login: (username: string, password: string, csrf: string) => void
}

interface IFormInput {
    username: string
    password: string
}

export const LoginForm: FC<LoginFormProps> = ({ login }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const csrf = useCSRF()

    const sendForm: SubmitHandler<IFormInput> = (data) => {
        login(data.username, data.password, csrf)
    }

    return (
        <Form onSubmit={handleSubmit(sendForm)}>
            <h1>Логин</h1>
            <Controller
                name='username'
                control={control}
                rules={{
                    required: 'Поле должно быть заполнено',
                    maxLength: {
                        value: 150,
                        message: 'Имя пользователя слишком большое'
                    }
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
            {errors.username && <ErrorText>{errors.username.message || 'Ошибка'}</ErrorText>}
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
                        />
                    )
                }}
            />
            {errors.password && <ErrorText>{errors.password.message || 'Ошибка'}</ErrorText>}
            <SubmitButton value='Отправить' />
        </Form>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        login: (username: string, password: string, csrf: string) => {
            dispatch(login(username, password, csrf))
        },
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)
