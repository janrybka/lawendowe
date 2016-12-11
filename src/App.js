import React, { Component } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import './img/plus_cursor.png';
import * as query from './module/getData';

class ImageCard extends Component {
  // <ReactIntense src={this.props.fullUrl} thumbnail={this.props.thumbUrl}  caption={'caption'} title={'title'} />

  componentDidMount() {
    var element = document.querySelector('.mdl-cell--2-col #' + this.props.id);
    window.Intense(element);
  }
  render() {
    return (
      <div className="mdl-cell mdl-cell--2-col">
        <div className='imgCard' id={this.props.id}
          style={{ background: 'url(' + this.props.thumbUrl + ') center / cover' }}
          data-image={this.props.fullUrl}
          data-title={"My beach adventure"}
          data-caption={"Thanks Sam, for the great picture"} />
      </div>
    );
  }
}

class GalleryCard extends Component {
  render() {
    return (
      <div className={(this.props.onHideGallery != null) ? "mdl-cell mdl-cell--12-col" : "mdl-cell mdl-cell--4-col" }>
        <div className="galleryCard mdl-card" style={{ background: 'url(' + this.props.item + ') center / cover' }}>
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text" ></h2>
          </div>
          <div className="mdl-card__actions">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris sagittis asdf as  asd fdasdfasdf sadf  asffdf dsaf a sf fasdf
            </span>
            {
              (this.props.onShowGallery != null) ? (
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => this.props.onShowGallery()} >
                  Zobacz galerię
                </button>
              ) : ""
            }
          </div>
          {
            (this.props.onHideGallery != null) ? (
              <div className="mdl-card__menu">
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--icon" onClick={() => this.props.onHideGallery()}>
                  <i className="material-icons">close</i>
                </button>
              </div>
            ) : ""
          }
        </div>
      </div>
    );
  }
}

class GalleryBackButton extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <div className='imgCard'>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => this.props.onHideGallery()} >
            Wróć do listy
        </button>
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
    var items = [];
    if (this.state.selectedGallery == null) {
      items = this.state.galleries.map((elem, idx) => (
        <GalleryCard key={elem.id} item={elem.cover} onShowGallery={() => this.showGallery(elem)} onHideGallery={null} />
      ));
    } else
      if (this.state.selectedGallery != null) {
        var sg = this.state.selectedGallery;
        var idx = this.state.galleries.indexOf(this.state.selectedGallery);
        var detailImgs = this.state.selectedGallery.elements.map((elem, idx) => (
          <ImageCard key={elem} id={'ic' + this.state.selectedGallery.id + "_" + elem}
            thumbUrl={this.baseAddress + '/' + this.state.selectedGallery.folder + '/' + elem + '_small.jpg'}
            fullUrl={this.baseAddress + '/' + this.state.selectedGallery.folder + '/' + elem + '_big.jpg'}
            onShowDialog={() => this.zoomImage(elem)} />
        ));
        items = [
          <GalleryCard key={sg.id} item={sg.cover} onShowGallery={null} onHideGallery={() => this.hideGallery(sg)} />
        ];
        items.splice(1, 0, detailImgs);
        items.push(
          <GalleryBackButton key={"backButton"} onHideGallery={() => this.hideGallery(sg)} />
        );
        //items.splice(idx+1, 0, detailImgs);
      }
    return (
      <div className="App">
        {this.state.choosenImg != null && <Dialog img={this.state.choosenImg} onClose={() => this.closeZoom()} />}
        <div>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={200} className="mdl-grid">
            {items}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
