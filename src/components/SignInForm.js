
import React from 'react'

import { Button, Input } from 'semantic-ui-react'
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
                <Input
                    className='input_username'
                    placeholder='Username...'
                    icon='user' iconPosition='left'
                    value={username}
                    onChange={handleChange}
                    margin='normal'
                    name='username' />
                <br />
                <Input
                    className='input_password'
                    placeholder='Password...'
                    icon='key' iconPosition='left'
                    value={password}
                    onChange={handleChange}
                    margin='normal'
                    name='password'
                    type='password' />
                <br />
                <div className='container-btn'>
                    <Button color='purple' className='login_btn' onClick={handleSubmit}>
                        LOGIN
                </Button>
                </div>

                <h1>Don't have an account yet? <Link to='/signup'> Signup Now! </Link> </h1>

            </div>
     
            
        )
    }
}

export default SignInForm