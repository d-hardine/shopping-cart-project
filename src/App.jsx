import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
}

export default App
