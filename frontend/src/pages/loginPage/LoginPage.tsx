import React, { FC } from 'react'
import classes from './LoginPage.module.css'
import { DescriptionBlock } from '../../components/appComponents/descriptionBlock/DescriptionBlock'
import LoginForm from '../../components/appComponents/loginForm/LoginForm'

const LoginPage: FC = () => {
    return (
        <div className={classes.pageContainer}>
            <DescriptionBlock />
            <div className={classes.formContainer}>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
