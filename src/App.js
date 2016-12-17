import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory } from 'react-router'
import './App.css';
import * as query from './components/getData';
import ImageCard, { GalleryBackButton } from './components/ImageCard';
import GalleryCard, { GalleryCardType } from './components/GalleryCard';

export default class App extends Component {
  constructor() {
    super();
    this.baseAddress = 'http://lawendowelove.pl/img/';
    this.state = {
      intro: true,
      initGalleryId: null,
      initImageId: null,
      selectedGallery: null,
      galleries: null,
    };
  }
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      initGalleryId: this.props.params.galleryId,
      initImageId: this.props.params.imageId,
    });

    query.getData('/data/galleries.json',
      (data) => {
        this.setState({
          galleries: data,
          selectedGallery: data.find(g => g.id === (Number)(this.state.initGalleryId)),
        });
        if (this.state.initImageId != null) {
          let selImg = document.getElementById(this.state.initImageId);
          if (selImg !== null) {
            selImg.click();
          }
        }
      },
      (error) => {
        alert(error);
      })
  }
  showGallery(gallery) {
    this.setState({
      selectedGallery: gallery,
    });
    const path=`/${gallery.id}`
    browserHistory.push(path);
  }
  hideGallery() {
    this.setState({
      selectedGallery: null,
    });
    browserHistory.push('/');
  }
  zoomImage(id) {
    const path=`/${this.state.selectedGallery.id}/${id}`
    browserHistory.push(path);
  }
  zoomClosed(id) {
    const path=`/${this.state.selectedGallery.id}`
    browserHistory.push(path);
  }
  renderGalleries() {
    if (this.state.galleries == null) {
      return (
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
      );
    }

    let items = [];
    let type = (this.state.selectedGallery == null) ? GalleryCardType.list : GalleryCardType.detailed;
    let galleries = (this.state.selectedGallery == null) ? this.state.galleries : [this.state.selectedGallery];
    items = galleries.map((elem, idx) => (
      <GalleryCard key={elem.id}
        item={elem.cover}
        title={elem.name}
        description={elem.description}
        type={type}
        onToggleGallery={() => (type === GalleryCardType.list) ? this.showGallery(elem) : this.hideGallery(elem)} />
    ));
    if (this.state.selectedGallery != null) {
      let sg = this.state.selectedGallery;
      //var idx = this.state.galleries.indexOf(this.state.selectedGallery);
      let detailImgs = sg.elements.map((elem, idx) => (
        <ImageCard
          key={elem.name}
          id={'ic' + sg.id + "_" + elem.name}
          thumbUrl={this.baseAddress + '/' + sg.folder + '/' + elem.name + '_small.jpg'}
          fullUrl={this.baseAddress + '/' + sg.folder + '/' + elem.name + '_big.jpg'}
          title={sg.name}
          subtitle={elem.subtitle}
          onZoomImage={() => this.zoomImage('ic' + sg.id + "_" + elem.name)}
          onZoomClosed={() => this.zoomClosed('ic' + sg.id + "_" + elem.name) } />
      ));
      detailImgs.push(
        <GalleryBackButton key={"backButton"} onHideGallery={() => this.hideGallery(sg)} />
      );
      //items.splice(idx+1, 0, detailImgs);
      items.splice(1, 0, detailImgs);
    }
    return items;
  }
  renderNavigation() {
    if (this.state.galleries == null) {
      return null;
    }
    let navigationLinks = this.state.galleries.map((elem, idx) => (
      <a key={elem.id} className="mdl-navigation__link" href={elem.id}>{elem.name}</a>
    ));
    return (
      <div className="mdl-layout__drawer mdl-layout__drawer--scroll">
        <span className="mdl-layout-title">Menu</span>
        <nav className="mdl-navigation">
          {navigationLinks}
        </nav>
      </div>
    );
  }
  render() {
    let navigationLinks = this.renderNavigation();
    let galleryItems = this.renderGalleries();
    return (
      <div className="mdl-layout mdl-js-layout">
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
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeave={false} className="mdl-grid">
                {galleryItems}
              </ReactCSSTransitionGroup>
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
