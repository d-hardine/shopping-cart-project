import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar({totalProducts}) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
                <Link to="/about">About</Link>
            </div>
            <Link to="/cart">Cart &#40;{totalProducts}&#41;</Link>
        </nav>
    )
}