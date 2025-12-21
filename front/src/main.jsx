import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store";
import "./index.css";
import App from "./App.jsx";
import MainLayout from "./components/common/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";
import SearchPage from "./pages/common/SearchPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PostManagement from "./pages/admin/PostManagement";
import ReportManagement from "./pages/admin/ReportManagement";
import ChatPage from "./pages/chat/ChatPage";
import ChatRoom from "./pages/chat/ChatRoom.jsx";
import LoginForm from "./components/common/LoginForm";
import PostView from "./pages/post/posts/PostView";
import { CookiesProvider } from "react-cookie";
import CreatePost from "./components/post/CreatePost.jsx";
import ImageUpload from "./components/post/ImageUpload.jsx";
import PostWrite from "./components/post/PostWrite.jsx";
import DevTest from "./components/post/DevTest.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "search", element: <SearchPage /> },
          { path: "chat", element: <ChatPage /> },
          { path: "chat/:chatroomId", element: <ChatRoom /> },
          { path: "main", element: <PostView selectMenu={0} /> },
        ],
      },

      {
        path: "/login",
        element: <LoginForm />,
        children: [],
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
    <CookiesProvider />
    <RouterProvider router={router} />
  </Provider>
);
