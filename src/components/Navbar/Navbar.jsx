import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar({cartNotification}) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
                <Link to="/about">About</Link>
            </div>
            <Link to="/cart">Cart &#40;{cartNotification}&#41;</Link>
        </nav>
    )
}