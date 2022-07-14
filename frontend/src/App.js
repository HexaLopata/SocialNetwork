import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/appComponents/navbar/Navbar'
import { privateRoutes, publicRoutes } from './global/routes'
import './styles/App.css'
import CSRF from './components/appComponents/csrf/CSRF'
import { connect } from 'react-redux'
import { checkIsAuthenticated } from './redux/reducers/authReducer/actions'
import { useEffect, useMemo } from 'react'
import AccountLoader from './components/appComponents/accountLoader/AccountLoader'
import InfoModal from './components/appComponents/modal/infoModal/InfoModal'
import PostPage from './pages/postPage/PostPage'
import LoginPage from './pages/loginPage/LoginPage'

function App({ isAuthenticated, isIniting, checkIsAuthenticated }) {
    useEffect(() => {
        checkIsAuthenticated()
    }, [checkIsAuthenticated])

    const routes = useMemo(
        () => (isAuthenticated ? privateRoutes : publicRoutes),
        [isAuthenticated]
    )

    return (
        <BrowserRouter>
            <CSRF />
            <Navbar />
            <InfoModal />
            {isIniting ? (
                <div>Загрузка</div>
            ) : (
                <AccountLoader>
                    <Routes>
                        {routes.map((e) => (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={<e.element />}
                            />
                        ))}
                        {isAuthenticated ? (
                            <Route path='*' element={<PostPage />} />
                        ) : (
                            <Route path='*' element={<LoginPage />} />
                        )}
                    </Routes>
                </AccountLoader>
            )}
        </BrowserRouter>
    )
}

const mapStateToProps = (state, ownProps) => {
    const isAuthenticated = state.auth.isAuthenticated
    const isIniting = state.app.isIniting
    return { isAuthenticated, isIniting, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkIsAuthenticated: () => dispatch(checkIsAuthenticated()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
