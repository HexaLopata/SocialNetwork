import React, { FC } from 'react'
import classes from '../loginPage/LoginPage.module.css'
import { DescriptionBlock } from '../../components/appComponents/descriptionBlock/DescriptionBlock'
import RegisterForm from '../../components/appComponents/registerForm/RegisterForm'

const RegisterPage: FC = () => {
    return (
        <div className={classes.pageContainer}>
            <DescriptionBlock />
            <div className={classes.formContainer}>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage
