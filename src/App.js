import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css';
import Map from './components/Map'
import SignInForm from './components/SignInForm';
import Header from './components/Header'
import Joined from './components/Joined'
import SignUpForm from 
'./components/SignUpForm'
import EventMap from 
'./components/EventMap'

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
          this.props.history.push('/')
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
        <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px'}}>
          <Header username={this.state.username} signout={this.signout}  />
          <NavBar />
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
          <Route path='/map' component={routerProps => <Map {...routerProps} username={this.state.username}/> 
          } />
            <Route path='/eventmap' component={routerProps => <EventMap {...routerProps} username={this.state.username} />
            } />
        </div>
        </Router>

      </div>
    );
  }
}

export default withRouter(App)
