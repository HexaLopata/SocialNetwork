import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import { privateRoutes, publicRoutes } from "./global/routes";
import './styles/App.css'
import CSRF from "./components/csrf/CSRF";
import { connect } from "react-redux";
import { checkIsAuthenticated } from "./redux/reducers/authReducer/actions";
import { useEffect, useMemo } from "react";
import AccountLoader from "./components/accountLoader/AccountLoader";
import InfoModal from "./components/modal/infoModal/InfoModal";

function App({ isAuthenticated, isIniting, checkIsAuthenticated }) {

  useEffect(() => {
    checkIsAuthenticated()
  }, [])

  const routes = useMemo(() => isAuthenticated ? privateRoutes : publicRoutes, [isAuthenticated])

  return (
    <BrowserRouter>
      <CSRF />
      <Navbar />
      <InfoModal />
      {isIniting ?
        <div>
          Загрузка
        </div>
        :
        <AccountLoader>
          <Routes>
            {routes.map(e => <Route key={e.path} path={e.path} element={<e.element />} />)}
            {/* <Route path="*" element={<ErrorPage />} /> */}
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
