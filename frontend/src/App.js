import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSearchField from "./components/searchFields/navbarSearchField/NavbarSearchField";
import Navbar from "./components/navbar/Navbar";
import ErrorPage from "./pages/ErrorPage";
import { privateRoutes, publicRoutes } from "./global/routes";
import './styles/App.css'
import CSRF from "./components/csrf/CSRF";
import { connect } from "react-redux";
import { checkIsAuthenticated } from "./redux/reducers/authReducer/actions";
import { useEffect, useMemo } from "react";
import Spinner from "./components/spinner/Spinner";
import CenteredBlock from "./components/general/centeredBlock/CenteredBlock";
import AccountLoader from "./components/accountLoader/AccountLoader";

function App({ isAuthenticated, isIniting, checkIsAuthenticated }) {

  useEffect(() => {
    checkIsAuthenticated()
  }, [])

  const routes = useMemo(() => isAuthenticated ? privateRoutes : publicRoutes, [isAuthenticated])

  return (
    <BrowserRouter>
      <CSRF />

      {isIniting ?
        <CenteredBlock>
          <Spinner />
        </CenteredBlock>
        :
        <AccountLoader>
          <Navbar>
            <NavbarSearchField placeholder='Поиск' />
          </Navbar>
          <Routes>
            {routes.map(e => <Route key={e.path} path={e.path} element={e.element} />)}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AccountLoader>
      }
    </BrowserRouter>
  );
}

const mapStateToProps = (state, ownProps) => {
  const isAuthenticated = state.auth.isAuthenticated
  const isIniting = state.app.isIniting
  return { isAuthenticated, isIniting, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkIsAuthenticated: () => dispatch(checkIsAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
