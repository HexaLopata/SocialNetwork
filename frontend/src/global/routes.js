import LoginPage from '../pages/loginPage/LoginPage'
import PostPage from '../pages/postPage/PostPage'
import EditProfilePage from '../pages/editProfilePage/EditProfilePage'
import ChatPage from '../pages/chatPage/ChatPage'
import ChatSelectionPage from '../pages/chatSelectionPage/ChatSelectionPage'
import ProfilePage from '../pages/profilePage/ProfilePage'
import RegisterPage from '../pages/registerPage/RegisterPage'

export const publicRoutes = [
    { path: '/login', element: LoginPage, name: 'Логин' },
    { path: '/register', element: RegisterPage, name: 'Регистрация' },
    { path: '/profile/:id', element: ProfilePage, name: 'Профиль' },
]

export const privateRoutes = [
    { path: '/profile', element: ProfilePage, name: 'Профиль' },
    { path: '/news', element: PostPage, name: 'Лента' },
    {
        path: '/editProfile',
        element: EditProfilePage,
        name: 'Редактировать профиль',
    },
    { path: '/chat/:id', element: ChatPage, name: 'Чат' },
    { path: '/messages', element: ChatSelectionPage, name: 'Сообщения' },
    { path: '/profile/:id', element: ProfilePage, name: 'Профиль' },
    {
        path: '/editProfile',
        element: EditProfilePage,
        name: 'Редактирование профиля',
    },
]
