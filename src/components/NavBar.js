import React from 'react'
import { Link } from 'react-router-dom';
import Header from './Header'
import './NavBar.css'

const NavBar = () => {
return (
    <nav>
    <div className="menu">
        <div className="menu_logo">
            <a className="brand_logo">UHEREPAL</a>
    </div>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/joined">Joined</Link></li>
        <li><Link to="/eventmap">Event Map</Link></li>
        <li><Link to="/map">Map</Link></li>
    </ul>
        </div>
    </nav>
    )
}

export default NavBar