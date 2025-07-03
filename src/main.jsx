import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { /*BrowserRouter,*/ createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
//import Home from './components/Home.jsx'
import ErrorPage from './components/Error-Page/Error-Page.jsx'
import Store from './components/Store.jsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {path: 'store', element: <Store />}
    ]
  },
])

/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)