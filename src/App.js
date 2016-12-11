import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import * as query from './components/getData';
import ImageCard, { GalleryBackButton } from './components/ImageCard';
import GalleryCard, { GalleryCardType } from './components/GalleryCard';

class App extends Component {
  constructor() {
    super();
    this.baseAddress = 'http://lawendowelove.pl/img/';
    this.state = {
      // choosenImg: null,
      selectedGallery: null,
      galleries: [],
    };
    query.getData('./data/galleries.json',
      (data) => {
        this.setState({
          galleries: data
        });
      },
      (error) => {
        alert(error);
      })
  }
  // zoomImage(img) {
  //   this.setState({
  //     choosenImg: img,
  //   });
  // }
  // closeZoom() {
  //   this.setState({
  //     choosenImg: null,
  //   });
  // }
  // {this.state.choosenImg != null && <Dialog img={this.state.choosenImg} onClose={() => this.closeZoom()} />}
  showGallery(gallery) {
    this.setState({
      selectedGallery: gallery,
    });
  }
  hideGallery() {
    this.setState({
      selectedGallery: null,
    });
  }
  render() {
    let navigationLinks = this.state.galleries.map((elem, idx) => (
      <a key={elem.id} className="mdl-navigation__link" href={elem.id}>{elem.name}</a>
    ));
    let items = [];
    let type = (this.state.selectedGallery == null) ? GalleryCardType.list : GalleryCardType.detailed; 
    let galleries = (this.state.selectedGallery == null) ? this.state.galleries : [this.state.selectedGallery];
    items = galleries.map((elem, idx) => (
      <GalleryCard key={elem.id} 
        item={elem.cover} 
        title={elem.name} 
        description={elem.description} 
        type={type}
        onToggleGallery={() => (type ===GalleryCardType.list) ? this.showGallery(elem) : this.hideGallery(elem)} />
    ));
    if (this.state.selectedGallery != null) {
      let sg = this.state.selectedGallery;
      var idx = this.state.galleries.indexOf(this.state.selectedGallery);
      let detailImgs = sg.elements.map((elem, idx) => (
        <ImageCard
          key={elem.name}
          id={'ic' + sg.id + "_" + elem.name}
          thumbUrl={this.baseAddress + '/' + sg.folder + '/' + elem.name + '_small.jpg'}
          fullUrl={this.baseAddress + '/' + sg.folder + '/' + elem.name + '_big.jpg'}
          title={sg.name}
          subtitle={elem.subtitle} />
      ));
      detailImgs.push(
        <GalleryBackButton key={"backButton"} onHideGallery={() => this.hideGallery(sg)} />
      );
      //items.splice(idx+1, 0, detailImgs);
      items.splice(1, 0, detailImgs);
    }
    return (
      <div className="mdl-layout mdl-js-layout">
        <div className='background'></div>
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">LawendoweLove.pl</span>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Menu</span>
          <nav className="mdl-navigation">
            {navigationLinks}
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="App">
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeave={false} className="mdl-grid">
                {items}
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

export default App;
