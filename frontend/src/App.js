import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import NavbarLink from "./components/links/navbarLink/NavbarLink";
import NavbarSearchField from "./components/searchFields/navbarSearchField/NavbarSearchField";
import Navbar from "./components/navbar/Navbar";
import ErrorPage from "./pages/Error";
import { routes } from "./global/routes";
import './styles/App.css'

function App() {
  return (
      <BrowserRouter>
        <Navbar>
          <NavbarSearchField placeholder='Поиск'></NavbarSearchField>
          <NavbarLink to="/profile">Профиль</NavbarLink>
          <NavbarLink to="/news">Лента</NavbarLink>
          <NavbarLink to="/messages">Сообщения</NavbarLink>
        </Navbar>
        <Routes>
          {routes.map(e => <Route key={e.path} path={e.path} element={e.element()} />)}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
