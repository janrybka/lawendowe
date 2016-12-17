import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import './index.css';
import 'dialog-polyfill/dialog-polyfill.css';
import 'es6-shim/es6-shim.js'

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/:galleryFolder" component={App} />
            <Route path="/:galleryFolder/:imageId" component={App} />
        </Router>
    ),
    document.getElementById('root')
);
