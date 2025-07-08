import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [cart, setCart] = useState([])
    const [checkId, setCheckId] = useState([])

    return (
        <>
            <Navbar/>
            <Outlet context={[cart, setCart, checkId, setCheckId]}/>
        </>
    )
}

export default App
