import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/store'
import './index.css'
import App from './App.jsx'
import MainLayout from './components/common/MainLayout'
import AdminLayout from './components/admin/AdminLayout'
import TestPage from './pages/TestPage'
import TestPage2 from './pages/TestPage2'
import SearchPage from './pages/common/SearchPage'
import LoadingTestPage from './pages/common/LoadingTestPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import PostManagement from './pages/admin/PostManagement'
import ReportManagement from './pages/admin/ReportManagement'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <TestPage /> },
          { path: "search", element: <SearchPage /> },
        ]
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <UserManagement /> },
          { path: "posts", element: <PostManagement /> },
          { path: "reports", element: <ReportManagement /> }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
