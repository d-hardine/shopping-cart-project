import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
            </div>
            <div className="cart">Cart &#40;0&#41;</div>
        </nav>
    )
}