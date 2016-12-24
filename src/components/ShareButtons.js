import React, { Component } from 'react';
import './ShareButtons.css';
import './../img/ShareButtons.png';

export default class ShareButtons extends Component {
  render() {
    return (
      <div id="sharePanelDiv">
        <p id="sharePanel" className="pull-right" style={{ marginRight: '1.5em'}}>
          <a href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Flawendowelove.pl&amp;media=&amp;description=" title="Share this page on pinterest" className="pop share-square share-square-pinterest"></a>
          <a href="https://plusone.google.com/_/+1/confirm?hl=en&amp;url=http%3A%2F%2Flawendowelove.pl" title="Share this page on googleplus" className="pop share-square share-square-googleplus"></a>
          <a href="http://www.facebook.com/share.php?u=http%3A%2F%2Flawendowelove.pl" title="Share this page on facebook" className="pop share-square share-square-facebook"></a>
          <a href="https://twitter.com/share?url=http%3A%2F%2Flawendowelove.pl&amp;text=LawendoweLove.PL" title="Share this page on twitter" className="pop share-square share-square-twitter"></a>
        </p>
      </div>
    );
  }
}