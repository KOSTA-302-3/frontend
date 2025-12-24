import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store";
import "./index.css";
import "./styles/theme.css";
import App from "./App.jsx";
import MainLayout from "./components/common/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";
import SearchPage from "./pages/common/SearchPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PostManagement from "./pages/admin/PostManagement";
import ReportManagement from "./pages/admin/ReportManagement";
import ChatRoom from "./pages/chat/ChatRoom.jsx";
import LoginForm from "./components/common/LoginForm";
import PostView from "./pages/post/posts/PostView";
import UserPage from "./pages/user/UserPage.jsx";
import CreatePost from "./components/post/CreatePost.jsx";
import ImageUpload from "./components/post/ImageUpload.jsx";
import PostWrite from "./components/post/PostWrite.jsx";
import DevTest from "./components/post/DevTest.jsx";
import Chat from "./pages/chat/Chat.jsx";
import SettingsPage from "./pages/user/SettingsPage.jsx";
import ProfileEditPage from "./pages/user/ProfileEditPage.jsx";
import BlockListPage from "./pages/user/BlockListPage.jsx";
import FollowListPage from "./pages/user/FollowListPage.jsx";
import Notification from "./pages/common/Notification.jsx";
import SignUp from "./pages/signup/SignUpDefault.jsx";
import SignUpLayout from "./pages/signup/SignUpPage.jsx";
import SignUpProfile from "./pages/signup/SignUpProfile.jsx";
import SignUpPage from "./pages/signup/SignUpPage.jsx";
import SignUpDefault from "./pages/signup/SignUpDefault.jsx";
import SignUpLevel from "./pages/signup/SignUpLevel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "mypage", element: <UserPage /> },
          { path: "user/:id", element: <UserPage /> },
          { path: "user/:id/follow", element: <FollowListPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "settings/profile", element: <ProfileEditPage /> },
          { path: "settings/blocks", element: <BlockListPage /> },
          { path: "search", element: <SearchPage /> },
          { path: "chat", element: <Chat /> },
          { path: "chat/:chatroomId", element: <ChatRoom /> },
          { path: "main", element: <PostView selectMenu={0} /> },
          { path: "notifications", element: <Notification /> },
        ],
      },

      {
        path: "/login",
        element: <LoginForm />,
        children: [],
      },
      {
        path: "/signup",
        element: <SignUpPage />,
        children: [
          { index: true, element: <SignUpDefault /> },
          { path: "profile", element: <SignUpProfile /> },
          { path: "level", element: <SignUpLevel /> },
        ],
      },
      {
        path: "/test",
        element: <DevTest />,
        children: [],
      },
      {
        path: "/write",
        element: <PostWrite />,
        children: [],
      },
      {
        path: "/posts",
        element: <ImageUpload />,
        children: [],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <UserManagement /> },
          { path: "posts", element: <PostManagement /> },
          { path: "reports", element: <ReportManagement /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
