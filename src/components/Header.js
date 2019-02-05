import React from 'react'
import { Link } from 'react-router-dom'

const Header = ( {username, signout }) => 
    <header className="App.header">
        <h1>Uherepal</h1>
    <h1 className='App-title'>
        {
        username ?
            `Welcome back, ${username}!` :
            `Welcome to React.` 
        }
        <br />
        {
            username
            ? <button onClick={signout}>SIGN OUT</button>
            : <Link to='/signin'><button>SIGN IN</button></Link>
        }
    </h1>
    </header>

export default Header


