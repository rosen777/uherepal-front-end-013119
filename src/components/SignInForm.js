
import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import './SignInForm.css'


import API from '../API'


class SignInForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        API.signin(this.state) 
        .then(data => {
        if (data.error) {
            alert(data.error)
        } else {
            this.props.signin(data)
            this.props.history.push('/joined')
         }
        })
    }

    handleChange = (event) => {        
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }


    render() {
        const { username, password } = this.state
        const { handleChange, handleSubmit } = this

        return (

            <div>
                <div>
                    <h1 className="login_text">
                    Log in
                    <span className='border-gradient border-gradient-purple'>
                        </span>
                    </h1>
                    
                </div>

                <TextField
                    id='usernameInput'
                    label='Username'
                    value={username}
                    onChange={handleChange}
                    margin='normal'
                    name='username'
                />
                <br />
                <TextField
                    id='passwordInput'
                    label='Password'
                    value={password}
                    onChange={handleChange}
                    margin='normal'
                    name='password'
                    type='password'
                />
                <br /> 
                <Button onClick={handleSubmit} variant='contained' color='primary'>
                    LOGIN
                </Button>
                

                <h1>Don't have an account yet? <Link to='/signup'> Signup Now! </Link> </h1>
                
            </div>
     
            
        )
    }
}

export default SignInForm