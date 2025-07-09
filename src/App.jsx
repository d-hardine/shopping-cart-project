import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [cart, setCart] = useState([])
    const [checkId, setCheckId] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)

    const sharedStates = [cart, setCart, checkId, setCheckId, totalProducts, setTotalProducts]

    return (
        <>
            <Navbar totalProducts={totalProducts}/>
            <Outlet context={sharedStates}/>
        </>
    )
}

export default App
