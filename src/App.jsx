import Navbar from './components/Navbar'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Footer from './components/Footer'

function App() {
    const [cart, setCart] = useState([])
    const [checkId, setCheckId] = useState([])
    const [cartNotification, setCartNotification] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)

    const sharedStates = [cart, setCart, checkId, setCheckId, setCartNotification, grandTotal, setGrandTotal]

    return (
        <>
            <Navbar cartNotification={cartNotification}/>
            <Outlet context={sharedStates}/>
            <Footer />
        </>
    )
}

export default App
