import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css'
import { useState } from "react";

export default function Navbar({cartNotification}) {
    const [isSideBarActive, setIsSideBarActive] = useState(false)

    function showSideBar() {
        setIsSideBarActive(true)
    }

    function hideSideBar() {
        setIsSideBarActive(false)
    }

    return (
        <nav className="navbar">
            {isSideBarActive ? 
            <div className="sidebar">
                <svg className="close-button" onClick={hideSideBar} align="right" xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" viewBox="0 -960 960 960" fill="grey"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                <CustomLink to="/" type="sidebar"><b>Home</b></CustomLink>
                <CustomLink to="/store" type="sidebar"><b>Store</b></CustomLink>
                <CustomLink to="/about" type="sidebar"><b>About</b></CustomLink>
                <CustomLink to="/cart" type="sidebar"><b>Cart &#40;{cartNotification}&#41;</b></CustomLink>
            </div>
            : 
            <div className="navbar-left">
                <svg className="navbar-link sidebar-button" onClick={showSideBar} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="grey"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                <CustomLink to="/"><b>Home</b></CustomLink>
                <CustomLink to="/store"><b>Store</b></CustomLink>
                <CustomLink to="/about"><b>About</b></CustomLink>
            </div>
            }
            <br />
            <div className="navbar-right">
                <CustomLink to="/cart">
                    <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                    {cartNotification !== 0 && <div className="notification-badge" ><b>{cartNotification}</b></div>}
                </CustomLink>
            </div>
        </nav>
    )
}

function CustomLink({to, type, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    if(type === 'sidebar')
        return (<Link to={to} className={isActive ? "navbar-link active sidebar-link" : "navbar-link sidebar-link"} {...props}>{children}</Link>)
    else if(to === '/cart')
        return (<Link to={to} className={isActive ? "navbar-link active" : "navbar-link"} {...props}>{children}</Link>)
    else
        return (<Link to={to} className={isActive ? "navbar-link active hide-on-mobile" : "navbar-link hide-on-mobile"} {...props}>{children}</Link>)
}