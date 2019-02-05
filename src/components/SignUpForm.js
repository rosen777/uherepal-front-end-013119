
import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'


import API from '../API'

class SignUpForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        API.createUser(this.state)
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    console.log(data)
                    this.props.signup(data)
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
                    SUBMIT
                </Button>

                <h1>Already have an account? <Link to='/signin'> 
                    Signin Now!
                </Link> 
                </h1>
            </div>
        )
    }
}

export default SignUpForm