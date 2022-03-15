import LoginPage from "../pages/LoginPage";
import MessagesPage from "../pages/MessagesPage";
import NewsPage from "../pages/NewsPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ChatPage from "../pages/ChatPage";

export const publicRoutes = [
    { path: '/login', element: <LoginPage/>, name: 'Логин' },
    { path: '/profile/:id', element: <ProfilePage/>, name: 'Профиль' },
]

export const privateRoutes = [
    { path: '/profile', element: <ProfilePage/>, name: 'Профиль' },
    { path: '/news', element: <NewsPage/>, name: 'Лента' },
    { path: '/editProfile', element: <EditProfilePage/>, name: 'Редактировать профиль' },
    { path: '/chat/:id', element: <ChatPage/>, name: 'Чат' },
    { path: '/messages', element: <MessagesPage/>, name: 'Сообщения' },
    { path: '/profile/:id', element: <ProfilePage/>, name: 'Профиль' },
]