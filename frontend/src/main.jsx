import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CheckApi from './CheckApi.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>That doesnt seem right, this page does not exist! :/</div>
  },
  {
    path: '/profile/:profileId',
    element: <div>This page is supposed to show you how many waffles youve eaten so far.. I guess not as many as me!</div>
  },
  {
    path: '/check',
    element: <CheckApi />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
