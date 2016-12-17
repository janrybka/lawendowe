import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import './index.css';
import 'dialog-polyfill/dialog-polyfill.css';

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/:galleryId" component={App} />
            <Route path="/:galleryId/:imageId" component={App} />
        </Router>
    ),
    document.getElementById('root')
);
