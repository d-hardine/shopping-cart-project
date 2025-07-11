import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css'
import shoppingcart from '../../assets/shopping-cart.svg'

export default function Navbar({cartNotification}) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <CustomLink to="/"><b>Home</b></CustomLink>
                <CustomLink to="/store"><b>Store</b></CustomLink>
                <CustomLink to="/about"><b>About</b></CustomLink>
            </div>
            <CustomLink to="/cart"><b>Cart &#40;{cartNotification}&#41;</b></CustomLink>
            <CustomLink to="/cart">
                <img src={shoppingcart} className="shopping-cart" alt="shopping-cart-svg" width={50} />
            </CustomLink>
        </nav>
    )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <Link to={to} className={isActive ? "navbar-link active" : "navbar-link"} {...props}>{children}</Link>
    )
}