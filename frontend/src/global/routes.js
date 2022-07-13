import LoginPage from '../pages/LoginPage'
import PostPage from '../pages/PostPage'
import EditProfilePage from '../pages/EditProfilePage'
import ChatPage from '../pages/ChatPage'
import ChatSelectionPage from '../pages/ChatSelectionPage'
import ProfilePage from '../pages/ProfilePage'
import RegisterPage from '../pages/RegisterPage'

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
    { path: '/editProfile', element: EditProfilePage, name: 'Редактирование профиля' }
]
