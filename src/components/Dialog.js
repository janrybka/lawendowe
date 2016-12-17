import React, { Component } from 'react';
import dialogPolyfill from 'dialog-polyfill';

export default class Dialog extends Component {
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
