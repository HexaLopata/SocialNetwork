import React, { useState } from 'react'
import Form from '../components/form/Form'
import TextInput from '../components/textInput/TextInput'
import SubmitButton from '../components/submitButton/SubmitButton'
import Block from '../components/block/Block'
import Text from '../components/text/Text'
import classes from './LoginPage.module.css'
import { connect } from 'react-redux'
import { register } from '../redux/reducers/authReducer/actions'
import { setError } from '../redux/reducers/appReducer/actions'

function RegisterPage({ register, csrf, showError }) {
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const tryRegister = (e) => {
        e.preventDefault()
        if (password == rePassword)
            register(login, password, name, lastName, birthdate, csrf)
        else
            showError('Пароли не совпадают')
    }

    return (
        <div className={classes.pageContainer}>
            <Block
                width='100%'
                height='100%'
                padding='25px'
            >
                <h1>Social Network</h1>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolor, delectus est odit ad vitae id rem quidem laboriosam adipisci debitis iure sunt corrupti pariatur consequatur nemo eos dolorem suscipit. Nam, accusantium eveniet autem sint blanditiis architecto explicabo, nisi beatae voluptas vel ut corporis esse! Error perspiciatis velit hic quasi expedita temporibus, dolorum harum beatae et fuga adipisci quisquam possimus, id laudantium tempora, obcaecati iste quod quidem officia unde ipsum! Pariatur et consequatur cupiditate, alias blanditiis quidem porro. Modi provident, architecto officiis sapiente aliquam nobis assumenda vitae porro quia necessitatibus aperiam id et quam earum facere amet vero, corporis in.
                </Text>
            </Block>
            <div className={classes.formContainer}>
                <Form onSubmit={tryRegister}>

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
                        placeholder='Пароль' password
                        value={password}
                        setValue={setPassword}
                    />
                    <TextInput
                        placeholder='Повтор пароля' password
                        value={rePassword}
                        setValue={setRePassword}
                    />
                    <SubmitButton
                        value='Отправить'
                    />
                </Form>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({ csrf: state.auth.csrf })

const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, password, firstName, lastName, birthdate, csrf) =>
            dispatch(register(username, password, firstName, lastName, birthdate, csrf)),
        showError: (message) => dispatch(setError(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)