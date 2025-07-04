import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import ErrorPage from './components/ErrorPage/ErrorPage.jsx'
import Store from './components/Store/Store.jsx'
import About from './components/About.jsx'
import ProductPage from './components/ProductPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {index: true, element:<Home/>},
      //{path: '/home', element: <Home />}, //might be unnecessary
      {path: '/store', element: <Store />},
      {path: '/about', element: <About />},
      {path: '/product/:productId', element: <ProductPage />}
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)