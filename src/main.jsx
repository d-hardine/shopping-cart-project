import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Store from './pages/Store.jsx'
import About from './pages/About.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Cart from './pages/Cart.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children:[
            {index: true, element:<Home/>},
            //{path: '/home', element: <Home />}, //might be unnecessary
            {path: '/store', element: <Store />},
            {path: '/product/:productId', element: <ProductPage />},
            {path: '/about', element: <About /> },
            {path: '/cart', element: <Cart /> },
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)