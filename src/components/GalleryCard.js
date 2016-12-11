import React, { Component } from 'react';
import './GalleryCard.css';

export const GalleryCardType = { list: 'List', detailed: 'Detailed' };

export default class GalleryCard extends Component {
  constructor() {
    super();
    this.state = {
      overCard: false,
    }
  }
  animateActions(overElement) {
    this.setState({
      overCard: overElement
    });
  }
  render() {
    let title = "";
    let description = "";
    if (this.props.type === GalleryCardType.list) {
      title = "";
      description = this.props.title;
    } else {
      title = this.props.title;
    if (Array.isArray(this.props.description)) {
      description = this.props.description.join('\n');
    } else {
      description = this.props.description;
    }
    }
    return (
      <div className={(this.props.type === GalleryCardType.detailed) ? "mdl-cell mdl-cell--12-col" : "mdl-cell mdl-cell--4-col" }>
        <div className={"galleryCard mdl-card mdl-shadow--3dp galleryCard"+this.props.type} style={{ background: 'url(' + this.props.item + ') center / cover' }}>
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text" >{title}</h2>
          </div>
          <div className="mdl-card__actions">
            <span dangerouslySetInnerHTML={{__html: description}}></span>
            {
              (this.props.type === GalleryCardType.list) ? (
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => this.props.onToggleGallery()} >
                  Zobacz galerię
                </button>
              ) : ""
            }
          </div>
          {
            (this.props.type === GalleryCardType.detailed) ? (
              <div className="mdl-card__menu">
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--icon" onClick={() => this.props.onToggleGallery()}>
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