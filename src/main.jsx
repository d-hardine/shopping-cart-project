import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import ErrorPage from './components/Error-Page/Error-Page.jsx'
import Store from './components/Store.jsx'
import About from './components/About.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {index: true, element:<Home/>},
      {path: 'home', element: <Home />}, //might be unnecessary
      {path: 'store', element: <Store />},
      {path: 'about', element: <About />}
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)