import React, {Component} from 'react'
import { Icon, Label } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { Button, Input } from 'semantic-ui-react'

import './Profile.css'

import API from '../API'

export default class Profile extends Component {

    state = {
        username: this.props.username,
        password: '',
        usernameSwitch: false,
        passwordSwitch: false,
    }

    handleUsernameSubmit = () => {
        let newUserObject = {
            "username": this.state.username
        }
        API.updateUser(newUserObject)
    }

    handlePasswordSubmit = () => {
        API.updatePassword(this.state.password)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUserEditClick = () => {
        this.setState({
            usernameSwitch: true
        })
    }

    handlePasswordEditClick = () => {
        this.setState({
            passwordSwitch: true
        })
    }

    render() {
        const { username, password } = this.state
        const { handleChange, handleUsernameSubmit,
        handlePasswordSubmit
         } = this

        return (

            <div>
                <div>
                    <h1 className="signup_text">
                        Profile
                    <span className='border-gradient border-gradient-purple'>
                        </span>
                    </h1>
                </div>
                {
                this.state.usernameSwitch === false ?
                <div>
                <div className='div-username'>
                    <span className='username_title'> Username: </span>
                </div>
                
                <div className='container_username_title'>
                    
                    <span>
                    {this.state.username}
                    </span>

                    <span className='span-edit'>
                        <Label as='a'>
                            <Icon name='pencil alternate' onClick={this.handleUserEditClick}/>
                        </Label>
                    </span>
                    </div>
                    </div>
                     :
                    <div>
                        <Input 
                        className = 'input_username'
                        label={{icon: 'asterisk'}} 
                        labelPosition='left corner'
                        placeholder='New Username...'
                        value={username}
                        onChange={handleChange}
                        margin='normal'
                        name='username' />
                    <span>
                        <Button color='purple' className='login_btn' onClick={handleUsernameSubmit}>
                            SUBMIT
                        </Button>
                    </span>
                          
                    </div>        
               
                }
                
                <br />

                {
                    this.state.passwordSwitch === false ?

            <div>
                <div className='div-password'>
                    <span className='password_title'> Password: </span>
                </div>

                <div className='container_password_title'>

                    <span>
                        ••••••
                    </span>

                    <span className='span-edit'>
                        <Label as='a'>
                            <Icon name='pencil alternate' onClick={this.handlePasswordEditClick} />
                        </Label>
                    </span>
                </div>

             </div>

            :
                <div>
                    
                <Input
                    className='input_password'
                    label={{ icon: 'asterisk' }}
                    labelPosition='left corner'
                    placeholder='New Password...'
                    value={password}
                    onChange={handleChange}
                    margin='normal'
                    name='password'
                    type='password' />
            
                <span>
                    <Button color='purple' className='login_btn' onClick={handlePasswordSubmit}>
                        SUBMIT
                    </Button>
                </span>

            

                </div>
                }
                        
                <div>
                    <div className='container-btn'>
                        <Button color='purple' className='signout_btn' onClick={this.props.signout}>
                            SIGN OUT
                     </Button>

                    </div>
                    <h1>Ready to see more events?<Link to='/eventmap'> Event Map </Link> </h1>

                </div>

                </div>
       

        )
    }
}
