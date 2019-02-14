import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = ( {signout}) => {
    
return (
    <nav>
    <div className="menu">
        <div className="menu_logo">
                <span className="brand_logo"><Link to="/eventmap">UHEREPAL</Link></span>
        </div>
    <ul>
        <li><Link to="/eventmap">Event Map</Link></li>
        <li><Link to="/joined">My Events</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to='' onClick={signout}>Signout</Link></li>
    </ul>
        </div>
    </nav>
    )
}

export default NavBar