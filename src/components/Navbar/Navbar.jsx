import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css'

export default function Navbar({cartNotification}) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <CustomLink to="/"><b>Home</b></CustomLink>
                <CustomLink to="/store"><b>Store</b></CustomLink>
                <CustomLink to="/about"><b>About</b></CustomLink>
            </div>
            <div className="navbar-right">
                <CustomLink to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                    {cartNotification !== 0 && <div className="notification-badge" ><b>{cartNotification}</b></div>}
                </CustomLink>
            </div>
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