import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from 'react-router'
import './Gallery.css';
import ImageCard, { GalleryBackButton } from './../components/ImageCard';
import GalleryCard, { GalleryCardType } from './../components/GalleryCard';
import * as query from './../components/getData';

export default class Gallery extends Component {
  constructor() {
    super();
    this.imgBaseAddress = process.env.PUBLIC_URL + '/img/gallery/';
    this.state = {
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
    const path = `/gallery/${gallery.folder}`
    this.redirect(path);
    var pageContent = document.querySelector(".mdl-layout__content");
    if (pageContent != null) {
      pageContent.scrollTop = 0;
    }
  }
  hideGallery() {
    this.redirect('/gallery');
  }
  zoomImage(id) {
    const path = `/gallery/${this.props.params.galleryFolder}/${id}`
    this.redirect(path);
  }
  zoomClosed(id) {
    const path = `/gallery/${this.props.params.galleryFolder}`
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
          onZoomClosed={() => this.zoomClosed('ic' + sg.folder + "_" + elem.name)} />
      ));
      detailImgs.push(
        <GalleryBackButton key={"backButton"} onHideGallery={() => this.hideGallery(sg)} />
      );
      //items.splice(idx+1, 0, detailImgs);
      items.splice(1, 0, detailImgs);
    }
    return items;
  }
  render() {
    let galleryItems = this.renderGalleries();
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={300}
        transitionLeave={false} className="mdl-grid">
        {galleryItems}
      </ReactCSSTransitionGroup>
    );
  }
}