import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [cart, setCart] = useState([])
    const [checkId, setCheckId] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)

    return (
        <>
            <Navbar totalProducts={totalProducts}/>
            <Outlet context={[cart, setCart, checkId, setCheckId, totalProducts, setTotalProducts]}/>
        </>
    )
}

export default App
