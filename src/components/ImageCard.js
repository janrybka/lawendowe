import React, { Component } from 'react';
import './ImageCard.css';
import './../img/plus_cursor.png';

export default class ImageCard extends Component {
  // <ReactIntense src={this.props.fullUrl} thumbnail={this.props.thumbUrl}  caption={'caption'} title={'title'} />
          // <div className="mdl-card__title mdl-card--expand">
          //   <h2 className="mdl-card__title-text" ></h2>
          // </div>
          // <div className="mdl-card__actions">
          //   <span>
          //     {this.props.title}
          //   </span>
          // </div>

  componentDidMount() {
    var element = document.querySelector('#' + this.props.id);
    window.Intense(element);
    element.addEventListener('mouseover', () => { element.className = "imgCard mdl-card mdl-shadow--6dp"; });
    element.addEventListener('mouseout', () => { element.className = "imgCard mdl-card mdl-shadow--2dp"; });
  }
  render() {
    return (
      <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--6-col-phone">
        <div className='imgCard mdl-card mdl-shadow--2dp' id={this.props.id}
          style={{ background: 'url(' + this.props.thumbUrl + ') center / cover' }}
          data-image={this.props.fullUrl}
          data-title={this.props.title}
          data-caption={this.props.subtitle}
        >
          <div className="mdl-card--expand"></div>
          <div className="mdl-card__actions">
            <span>{this.props.subtitle}</span>
          </div>
        </div>
      </div>
    );
  }
}

export class GalleryBackButton extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onClick={() => this.props.onHideGallery()} >
            Wróć do listy
        </button>
        </div>
      </div>
    );
  }
}