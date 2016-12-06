import React, { Component } from 'react';
import './App.css';
import dialogPolyfill from 'dialog-polyfill';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class GalleryCard extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--4-col">
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
    let dialogDiv = document.querySelector('#dialogTest');
    if (!dialogDiv.showModal) {
      dialogPolyfill.registerDialog(dialogDiv);
    }
    dialogDiv.showModal();
  }
  componentWillUnmount() {
    let dialogDiv = document.querySelector('#dialogTest');
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
        <dialog id='dialogTest' className="mdl-dialog">
          <h4 className="mdl-dialog__title">Allow data collection? {String(this.props.selectedCardId)}</h4>
          <div className="mdl-dialog__content">
            <p>
              Allowing us to collect data will let us get you the information you want faster.
            </p>
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
    this.state = {
      dialogOpen: false,
      selectedCardId: null,
    };
  }
  showDialog(cardId) {
    this.setState({
      dialogOpen: true,
      selectedCardId: cardId,
    });
  }
  closeDialog() {
    this.setState({
      dialogOpen: false,
      selectedCardId: null,
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.dialogOpen && <Dialog selectedCardId={this.state.selectedCardId} onClose={() => this.closeDialog()} />}
        <div className="mdl-grid">
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" onShowDialog={() => this.showDialog(1)} />
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" onShowDialog={() => this.showDialog(2)} />
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" onShowDialog={() => this.showDialog(3)} />
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" onShowDialog={() => this.showDialog(4)} />
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" />
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" />
          <GalleryCard item="http://lawendowelove.pl/img/general/lawenda.jpg" />
        </div>
      </div>
    );
  }
}

export default App;
