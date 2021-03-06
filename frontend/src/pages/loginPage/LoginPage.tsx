import React, { FC, useState } from 'react'
import Form from '../../components/ui/form/Form'
import TextInput from '../../components/ui/textInput/TextInput'
import SubmitButton from '../../components/ui/submitButton/SubmitButton'
import Block from '../../components/ui/block/Block'
import Text from '../../components/ui/text/Text'
import { login } from '../../redux/reducers/authReducer/asyncActions'
import classes from './LoginPage.module.css'
import { connect } from 'react-redux'
import useCSRF from '../../hooks/useCSRF'
import { TDispatch } from '../../redux/store'
import { Props } from '../../types/Props'

interface LoginPageProps extends Props {
    login: (username: string, password: string, csrf: string) => void
}

const LoginPage: FC<LoginPageProps> = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const csrf = useCSRF()

    const tryLogin = (e: React.FormEvent) => {
        e.preventDefault()
        login(username, password, csrf)
    }

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
                <Form onSubmit={tryLogin}>
                    <h1>??????????</h1>
                    <TextInput
                        placeholder='??????????'
                        value={username}
                        setValue={setUsername}
                    />
                    <TextInput
                        placeholder='????????????'
                        password
                        value={password}
                        setValue={setPassword}
                    />
                    <SubmitButton value='??????????????????' />
                </Form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        login: (username: string, password: string, csrf: string) => {
            dispatch(login(username, password, csrf))
        },
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)
