import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import App from './App';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';
import 'dialog-polyfill/dialog-polyfill.css';
import 'es6-shim/es6-shim.js'

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/about" component={About} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/gallery/:galleryFolder" component={Gallery} />
                <Route path="/gallery/:galleryFolder/:imageId" component={Gallery} />
                <Route path="/contact" component={Contact} />
                <IndexRedirect to="/gallery" />
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
