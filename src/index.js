import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

const env = require('dotenv')
window.env = env

ReactDOM.render(
    <BrowserRouter><App />
    </BrowserRouter>,
    document.getElementById('root')
    );


