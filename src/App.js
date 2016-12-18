import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router'
import Gallery from './pages/Gallery'
import './App.css';

export default class App extends Component {
  // constructor() {
  //   super();
  // }
  renderNavigation() {
    // if (this.state.galleries == null) {
    //   return null;
    // }
    let navigationLinks = null;
    // this.state.galleries.map((elem, idx) => (
    //   <Link key={elem.folder} className="mdl-navigation__link" to={"/gallery/" + elem.folder}>{elem.name}</Link>
    // ));
    return (
      <div className="mdl-layout__drawer mdl-layout__drawer--scroll">
        <span className="mdl-layout-title">Menu</span>
        <nav className="mdl-navigation">
          <Link key="About" className="mdl-navigation__link" to="/about"><i className="material-icons">person</i>O mnie</Link>
          <Link key="Gallery" className="mdl-navigation__link" to="/gallery"><i className="material-icons">camera_alt</i>Galeria</Link>
          {navigationLinks}
        </nav>
      </div>
    );
  }
  render() {
    let navigationLinks = this.renderNavigation();
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">LawendoweLove.pl</span>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
        {navigationLinks}
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="App">
              {this.props.children}
            </div>
            <footer className="mdl-mini-footer">
              <div className="mdl-mini-footer__left-section">
                <div className="mdl-logo">LawendoweLove.pl -  2016 R4System.NET Jan Rybka</div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    );
  }
}
