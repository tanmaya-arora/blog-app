import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AddPost from './components/Posts/AddPost.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/create', element: <AddPost />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
