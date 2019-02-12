import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './SignUpForm.css'


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
                <div>
                    <h1 className="login_text">
                        Sign up
                    <span className='border-gradient border-gradient-purple'>
                        </span>
                    </h1>

                </div>
                <Input
                    className='input_username'
                    label={{ icon: 'asterisk' }}
                    labelPosition='left corner'
                    placeholder='Username...'
                    value={username}
                    onChange={handleChange}
                    margin='normal'
                    name='username' />
                <br />
                <Input
                    className='input_password'
                    label={{ icon: 'asterisk' }}
                    labelPosition='left corner'
                    placeholder='Password...'
                    value={password}
                    onChange={handleChange}
                    margin='normal'
                    name='password'
                    type='password' />
                <br />
                <div className='container-btn'>
                    <Button color='purple' className='singup_btn' onClick={handleSubmit}>
                        SIGN UP
                </Button>
                </div>

                <h1>Don't have an account yet? <Link to='/signup'> Signup Now! </Link> </h1>

            </div>
        )
    }
}

export default SignUpForm