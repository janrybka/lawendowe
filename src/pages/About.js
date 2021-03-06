import React, { Component } from 'react';
import './About.css';

export default class AboutMe extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col">
          <h1>O mnie</h1>
          <p>Miło mi powitać na stronie internetowej LawendoweLove.pl</p>
          <p>
              W kolejnych odsłonach strony prezentuję efekty mojej pasji związanej z uprawą lawendy i wyrobami
              rękodzielniczymi z lawendy oraz innych roślin. Z przyjemnością przedstawiam efekty mojej pracy.
              Liczę na przychylne przyjęcie i życzę miłych wrażeń.<br/>
              <br/>
              Dziękuję moim najbliższym. Bez nich strona LawendoweLove by nie powstała.<br/>
          </p>
          <p>
              Małgorzata Rybka<br/>
          </p>
          <img role="presentation" src="http://lawendowelove.pl/img/general/o_mnie_big.jpg" className="img-responsive" />
        </div>
        <div className="mdl-cell mdl-cell--4-col">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flawendowelove&tabs=timeline&width=340&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=440388012675392"
              width="340" height="500" 
              style={{border:'none', overflow:'hidden'}} scrolling="yes" frameborder="0" allowTransparency="true"></iframe>
        </div>
      </div>
    );
  }
}