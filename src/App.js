import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css';
import SignInForm from './components/SignInForm';
import Joined from './components/Joined'
import SignUpForm from 
'./components/SignUpForm'
import EventMap from 
'./components/EventMap'
import Profile from './components/Profile'

import API from './API'

class App extends Component {
  state= {
    username: ''
  }

  signin = (data) => {
    this.setState({
      username: data.username
    })

    localStorage.setItem('token', data.token)
  }

  signup = (data) => {
    this.setState({
      username: data.username
    })

    localStorage.setItem('token', data.token)
  }

  signout = () => {
    this.setState({ 
      username: '' 
    })
    localStorage.removeItem('token')
  }

  componentDidMount() {
    API.validate()
      .then(data => {
        if (data.error) {
          this.props.history.push('/signin')
        } else {
          this.signin(data)
          this.props.history.push('/eventmap')
        }
      })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <Router>
        <div style={{ paddingBottom: '10px', marginBottom: '12px'}}>
          <NavBar signout={this.signout} />
            <Route exact path='/' component={routerProps =>
              <SignInForm {...routerProps} signin={this.signin} />} /> 
            <Route path='/signin' component={routerProps => 
              <SignInForm {...routerProps} signin={this.signin} />} />
            <Route path='/signup' component={routerProps =>
              <SignUpForm {...routerProps} signup={this.signup}
               />} />
            <Route path='/joined' component={routerProps =>
              <Joined {...routerProps} username={this.state.username} />
            } />
            <Route path='/eventmap' component={routerProps => <EventMap {...routerProps} username={this.state.username} /> 
            } /> 
            <Route path='/profile' component={routerProps =>
              <Profile {...routerProps}
              username={this.state.username}
              signout={this.signout}
               />} />
        </div>
        </Router>

      </div>
    );
  }
}

export default withRouter(App)
