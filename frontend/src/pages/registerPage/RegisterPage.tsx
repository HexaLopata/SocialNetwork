import React, { FC, useCallback, useState } from 'react'
import Form from '../../components/ui/form/Form'
import TextInput from '../../components/ui/textInput/TextInput'
import SubmitButton from '../../components/ui/submitButton/SubmitButton'
import Block from '../../components/ui/block/Block'
import Text from '../../components/ui/text/Text'
import classes from '../loginPage/LoginPage.module.css'
import { connect } from 'react-redux'
import { register } from '../../redux/reducers/authReducer/asyncActions'
import useCSRF from '../../hooks/useCSRF'
import { TDispatch } from '../../redux/store'
import { setError } from '../../redux/reducers/appReducer'
import { Props } from '../../types/Props'

interface RegisterPageProps extends Props {
    register: (
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        birthdate: string,
        csrf: string
    ) => void

    showError: (message: string) => void
}

const RegisterPage: FC<RegisterPageProps> = ({ register, showError }) => {
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const csrf = useCSRF()

    const tryRegister = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (password === rePassword)
                register(login, password, name, lastName, birthdate, csrf)
            else showError('Пароли не совпадают')
        },
        [
            birthdate,
            csrf,
            lastName,
            login,
            name,
            password,
            rePassword,
            register,
            showError,
        ]
    )

    return (
        <div className={classes.pageContainer}>
            <Block height='calc(100vh - 60px)' padding='25px' width='100%'>
                <h1>Social Network</h1>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus dolor, delectus est odit ad vitae id rem quidem
                    laboriosam adipisci debitis iure sunt corrupti pariatur
                    consequatur nemo eos dolorem suscipit. Nam, accusantium
                    eveniet autem sint blanditiis architecto explicabo, nisi
                    beatae voluptas vel ut corporis esse! Error perspiciatis
                    velit hic quasi expedita temporibus, dolorum harum beatae et
                    fuga adipisci quisquam possimus, id laudantium tempora,
                    obcaecati iste quod quidem officia unde ipsum! Pariatur et
                    consequatur cupiditate, alias blanditiis quidem porro. Modi
                    provident, architecto officiis sapiente aliquam nobis
                    assumenda vitae porro quia necessitatibus aperiam id et quam
                    earum facere amet vero, corporis in.
                </Text>
            </Block>
            <div className={classes.formContainer}>
                <Form autoComplete='off' onSubmit={tryRegister}>
                    <h1>Регистрация</h1>
                    <TextInput
                        placeholder='Логин'
                        value={login}
                        setValue={setLogin}
                    />
                    <TextInput
                        placeholder='Имя'
                        value={name}
                        setValue={setName}
                    />
                    <TextInput
                        placeholder='Фамилия'
                        value={lastName}
                        setValue={setLastName}
                    />
                    <TextInput
                        placeholder='Дата рождения: DD.MM.YYYY'
                        value={birthdate}
                        setValue={setBirthdate}
                    />
                    <TextInput
                        placeholder='Пароль'
                        password
                        value={password}
                        setValue={setPassword}
                        autoComplete='new-password'
                    />
                    <TextInput
                        placeholder='Повтор пароля'
                        password
                        value={rePassword}
                        setValue={setRePassword}
                        autoComplete='new-password'
                    />
                    <SubmitButton value='Отправить' />
                </Form>
            </div>
        </div>
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
        showError: (message: string) => dispatch(setError(message)),
    }
}

export default connect(null, mapDispatchToProps)(RegisterPage)
