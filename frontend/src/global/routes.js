import LoginPage from "../pages/Login";
import MessagesPage from "../pages/Messages";
import NewsPage from "../pages/News";
import ProfilePage from "../pages/Profile";
import EditProfilePage from "../pages/EditProfile";
import ChatPage from "../pages/Chat";

export const routes = [
    { path: '/login', permission: 'Unauthorized', element: LoginPage },
    { path: '/profile', permission: 'Authorized', element: ProfilePage },
    { path: '/news', permission: 'Authorized', element: NewsPage },
    { path: '/messages', permission: 'Authorized', element: MessagesPage },
    { path: '/profile/:id', permission: 'Any', element: ProfilePage },
    { path: '/editProfile/', permission: 'Any', element: EditProfilePage },
    { path: '/chat/:id', permission: 'Any', element: ChatPage },
]