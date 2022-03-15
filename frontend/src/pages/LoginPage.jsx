import { useState } from "react";
import { connect } from "react-redux";
import SubmitButton from "../components/general/buttons/submitButton/SubmitButton";
import HeaderLabel from "../components/general/labels/headerLabel/HeaderLabel";
import StackPanel from "../components/general/stackpanel/StackPanel";
import TextInput from "../components/general/textInput/TextInput";
import DefaultPageWrapper from "../components/pageWrappers/DefaultPageWrapper";
import { login } from "../redux/reducers/authReducer/actions";

const LoginPage = function ({csrf, login}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const tryLogin = (e) => {
        e.preventDefault()
        login(username, password, csrf)
    }

    return (
        <DefaultPageWrapper>
            <form onSubmit={tryLogin}>
                <StackPanel>
                    <HeaderLabel>Логин</HeaderLabel>
                    <TextInput 
                        placeholder='Логин'
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                    <TextInput
                        placeholder='Пароль'
                        isPassword={true}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <SubmitButton>
                        Отправить
                    </SubmitButton>
                </StackPanel>
            </form>
        </DefaultPageWrapper>
    );
}

const mapStateToProps = (state) => ({
    csrf: state.auth.csrf,
})

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password, csrf) => dispatch(login(username, password, csrf))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);