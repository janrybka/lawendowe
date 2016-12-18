import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory, Link } from 'react-router'
import './App.css';
import * as query from './components/getData';
import ImageCard, { GalleryBackButton } from './components/ImageCard';
import GalleryCard, { GalleryCardType } from './components/GalleryCard';

export default class App extends Component {
  constructor() {
    super();
    this.imgBaseAddress = process.env.PUBLIC_URL + '/img/';
    this.state = {
      intro: true,
      // selectedGalleryId: null,
      initImageId: null,
      galleries: null,
    };
  }
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      initImageId: this.props.params.imageId,
    });

    query.getData(process.env.PUBLIC_URL + '/data/galleries.json',
      (data) => {
        this.setState({
          galleries: data,
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
    const path=`/${gallery.folder}`
    this.redirect(path);
  }
  hideGallery() {
    this.redirect('/');
  }
  zoomImage(id) {
    const path=`/${this.props.params.galleryFolder}/${id}`
    this.redirect(path);
  }
  zoomClosed(id) {
    const path=`/${this.props.params.galleryFolder}`
    this.redirect(path);
  }
  redirect(path) {
    hashHistory.push(path);
  }
  renderGalleries() {
    if (this.state.galleries == null) {
      return (
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
      );
    }

    let items = [];
    let selectedGallery = this.state.galleries.find(g => g.folder === (this.props.params.galleryFolder));
    let type = (selectedGallery == null) ? GalleryCardType.list : GalleryCardType.detailed;
    let galleries = (selectedGallery == null) ? this.state.galleries : [selectedGallery];
    items = galleries.map((elem, idx) => (
      <GalleryCard key={elem.folder}
        item={this.imgBaseAddress + '/' + elem.folder + (type === GalleryCardType.list ? '/min/' : '/big/') + elem.cover + '.jpg'}
        title={elem.name}
        description={elem.description}
        type={type}
        onToggleGallery={() => (type === GalleryCardType.list) ? this.showGallery(elem) : this.hideGallery(elem)} />
    ));
    if (selectedGallery != null) {
      let sg = selectedGallery;
      let detailImgs = sg.elements.map((elem, idx) => (
        <ImageCard
          key={elem.name}
          id={'ic' + sg.folder + "_" + elem.name}
          thumbUrl={this.imgBaseAddress + '/' + sg.folder + '/min/' + elem.name + '.jpg'}
          fullUrl={this.imgBaseAddress + '/' + sg.folder + '/big/' + elem.name + '.jpg'}
          title={sg.name}
          subtitle={elem.subtitle}
          onZoomImage={() => this.zoomImage('ic' + sg.folder + "_" + elem.name)}
          onZoomClosed={() => this.zoomClosed('ic' + sg.folder + "_" + elem.name) } />
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
      <Link key={elem.folder} className="mdl-navigation__link" to={"/" + elem.folder}>{elem.name}</Link>
    ));
    return (
      <div className="mdl-layout__drawer mdl-layout__drawer--scroll">
        <span className="mdl-layout-title">Menu</span>
        <nav className="mdl-navigation">
          <Link key="AboutMe" className="mdl-navigation__link" to={"/AboutMe"}>O mnie</Link>
          <nav className="mdl-navigation">
            {navigationLinks}
          </nav>
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
