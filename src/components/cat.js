import React, { Component } from 'react';
import './cat.css';

export default class Cat extends Component {
  render() {
    return (
      <div className="Cat">
        <img src={require('../images/cats/cat.png')} alt="" className="Cat__image"/>
      </div>
    );
  }
}
