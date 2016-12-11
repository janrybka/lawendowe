import React, { Component } from 'react';
import './App.css';
import dialogPolyfill from 'dialog-polyfill';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ImageCard extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--2-col">
        <div className="imgCard mdl-card" style={{ background: 'url(' + this.props.item + ') center / cover' }} onClick={() => this.props.onShowDialog()}>
          <div className="mdl-card__title mdl-card--expand">
          </div>
          <div className="mdl-card__actions">
          </div>
        </div>
      </div>
    );
  }
}

class GalleryCard extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <div className="galleryCard mdl-card" style={{ background: 'url(' + this.props.item + ') center / cover' }}>
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text" >Tytuł</h2>
          </div>
          <div className="mdl-card__actions">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris sagittis asdf as  asd fdasdfasdf sadf  asffdf dsaf a sf fasdf
            </span>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => this.props.onShowDialog()} >
              Zobacz galerię
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Dialog extends Component {
  componentDidMount() {
    let dialogDiv = document.querySelector('#galleryView');
    if (!dialogDiv.showModal) {
      dialogPolyfill.registerDialog(dialogDiv);
    }
    dialogDiv.showModal();
  }
  componentWillUnmount() {
    let dialogDiv = document.querySelector('#galleryView');
    dialogDiv.close();
    //work arround is here!
    document.querySelector('.mdl-layout__content').style.overflowX = 'auto';
    document.querySelector('.mdl-layout__content').style.overflowX = '';
    //work arround done!
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={300}>
        <dialog id='galleryView' className="mdl-dialog galleryDialog">
          <div className="mdl-dialog__content">
            <img src={this.props.img} />
          </div>
          <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button" onClick={() => this.props.onClose()}>Agree</button>
          </div>
        </dialog>
      </ReactCSSTransitionGroup>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.baseAddress = 'http://lawendowelove.pl/img/';
    this.state = {
      choosenImg: null,
      selectedGallery: null,
      galleries: [
        {
          id: 1, 
          cover: 'http://lawendowelove.pl/img/general/lawenda.jpg',
          folder: 'pole_lawendy',          
          elements: [
            'pole_1',
            'uprawa_2015',
            'uprawa_22015',
            'uprawa_32015',
            'pole_5',
            'pole_7',
            'pole_8',
            'pole_9',
            'pole_10b',
            'pole_11',
            'pole_12',
          ]
        },
        {
          id: 2, cover: 'http://lawendowelove.pl/img/general/lawenda.jpg',
          elements: [
            'uprawa_22015',
            'pole_1',
          ]
        },
        {
          id: 3, cover: 'http://lawendowelove.pl/img/general/lawenda.jpg',
          elements: [
            'uprawa_2015',
            'pole_1',
          ]
        },
        {
          id: 4, cover: 'http://lawendowelove.pl/img/general/lawenda.jpg',
          elements: [
            'uprawa_22015',
            'uprawa_2015',
          ]
        },
      ],
    };
  }
  zoomImage(img) {
    this.setState({
      choosenImg: img,
    });
  }
  closeZoom() {
    this.setState({
      choosenImg: null,
    });
  }
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
    var items = this.state.galleries.map((elem, idx) => (
      <GalleryCard key={elem.id} item={elem.cover} onShowDialog={() => this.showGallery(elem)} />
    ));
    if (this.state.selectedGallery != null) {
      var idx = this.state.galleries.indexOf(this.state.selectedGallery);
      var detailImgs = this.state.selectedGallery.elements.map((elem, idx) => (
        <ImageCard key={elem} item={elem} onShowDialog={() => this.zoomImage(elem)} />
      ));
      items.splice(idx+1, 0, detailImgs);
    }
    return (
      <div className="App">
        {this.state.choosenImg != null && <Dialog img={this.state.choosenImg} onClose={() => this.closeZoom()} />}
        <div>
          <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300} className="mdl-grid">
          {items}
        </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
