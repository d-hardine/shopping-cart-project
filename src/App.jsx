import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
import Store from './components/Store'
import './App.css'

function App() {
  return (
    <>
      <Navbar/>
          <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/store"  element={<Store/>} />
          </Routes>
    </>
  )
}

export default App
