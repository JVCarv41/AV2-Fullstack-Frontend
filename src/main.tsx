import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AuthPage from './pages/authPage/AuthPage'
import ErrorPage from './pages/ErrorPage'

import './index.css'

const router = createBrowserRouter([{
  path: '/',
  element: <AuthPage />,
  errorElement: <ErrorPage />
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
