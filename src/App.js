import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import { Link } from 'react-router'
import ShareButtons from './components/ShareButtons'
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
          <Link key="About" className="mdl-navigation__link" to="/about" onClick={() => this.onNavigationClick()}><i className="material-icons">person</i> O mnie</Link>
          <Link key="Gallery" className="mdl-navigation__link" to="/gallery" onClick={() => this.onNavigationClick()}><i className="material-icons">camera_alt</i> Galeria</Link>
          {navigationLinks}
          <Link key="Contact" className="mdl-navigation__link" to="/contact" onClick={() => this.onNavigationClick()}><i className="material-icons">contact_mail</i> Kontakt</Link>
        </nav>
      </div>
    );
  }
  navigateHome() {
    hashHistory.push('/gallery');
  }
  toogleDrawer() {
    let layout = document.querySelector('.mdl-layout');
    layout.MaterialLayout.toggleDrawer();
  }
  onNavigationClick() {
    this.toogleDrawer();
  }
  render() {
    let navigationLinks = this.renderNavigation();
    return (
      <div className="mdl-layout mdl-js-layout"> 
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title" onClick={() => this.navigateHome()}>LawendoweLove.pl</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <Link key="About" className="mdl-navigation__link" to="/about"><i className="material-icons">person</i> O mnie</Link>
              <Link key="Gallery" className="mdl-navigation__link" to="/gallery"><i className="material-icons">camera_alt</i> Galeria</Link>
              <Link key="Contact" className="mdl-navigation__link" to="/contact"><i className="material-icons">contact_mail</i> Kontakt</Link>
            </nav>
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
                <div className="mdl-logo">LawendoweLove.pl - 2016 R4System.NET Jan Rybka</div>
              </div>
              <div class="mdl-mini-footer__right-section">
                <ShareButtons />
              </div>
            </footer>
          </div>
        </main>
      </div>
    );
  }
}
