import LoginPage from '../pages/loginPage/LoginPage'
import PostPage from '../pages/postPage/PostPage'
import EditProfilePage from '../pages/editProfilePage/EditProfilePage'
import PrivateChatPage from '../pages/chatPage/PrivateChatPage'
import ChatSelectionPage from '../pages/chatSelectionPage/ChatSelectionPage'
import ProfilePage from '../pages/profilePage/ProfilePage'
import RegisterPage from '../pages/registerPage/RegisterPage'
import FriendsPage from '../pages/friendsPage/FriendsPage'
import OtherProfilePage from '../pages/otherProfilePage/OtherProfilePage'

export const publicRoutes = [
    { path: '/login', element: LoginPage, name: 'Логин' },
    { path: '/register', element: RegisterPage, name: 'Регистрация' },
    { path: '/profile/:id', element: OtherProfilePage, name: 'Профиль' },
]

export const privateRoutes = [
    { path: '/profile', element: ProfilePage, name: 'Профиль' },
    { path: '/news', element: PostPage, name: 'Лента' },
    {
        path: '/editProfile',
        element: EditProfilePage,
        name: 'Редактировать профиль',
    },
    { path: '/chat/:id', element: PrivateChatPage, name: 'Чат' },
    { path: '/messages', element: ChatSelectionPage, name: 'Сообщения' },
    { path: '/profile/:id', element: OtherProfilePage, name: 'Профиль' },
    { path: '/friends', element: FriendsPage, name: 'Список друзей' },
    {
        path: '/editProfile',
        element: EditProfilePage,
        name: 'Редактирование профиля',
    },
]
