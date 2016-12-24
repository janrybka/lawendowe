import React, { Component } from 'react';
import './Contact.css';

export default class Contact extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col">
          <img src={ process.env.PUBLIC_URL + '/img/contact/contact.jpg'} role="presentation" className="img-responsive" />
        </div>
        <div className="mdl-cell mdl-cell--8-col">
          <h1>Kontakt</h1>
          <p>&nbsp;</p>
          <p>
            Jeśli chcesz ozdobić swój dom, poczuć zapach lawendy, podarować oryginalny prezent,
              skontaktuj się ze mną, a znajdziemy rozwiązanie.
          </p>
          <h4><a href="mailto:m.rybka@lawendowelove.pl">Napisz do mnie</a></h4>
        </div>
      </div>
    );
  }
}