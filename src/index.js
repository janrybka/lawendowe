import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'dialog-polyfill/dialog-polyfill.css';


// <nav className="mdl-navigation mdl-layout--large-screen-only">
//     <a className="mdl-navigation__link" href="">Link</a>
//     <a className="mdl-navigation__link" href="">Link</a>
//     <a className="mdl-navigation__link" href="">Link</a>
//     <a className="mdl-navigation__link" href="">Link</a>
// </nav>

ReactDOM.render(
    (
        <App />
    ),
    document.getElementById('root')
);
