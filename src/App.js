import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css';
import Map from './components/Map'


class App extends Component {
  render() {
    return (
      <Router>
      <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px'}}>
        <NavBar />
        <Route exact path='/map' component={Map} /> 
      </div>
      </Router>
    );
  }
}

export default App;
