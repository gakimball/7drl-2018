import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './cat.css';

export default class Cat extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
  }

  static defaultProps = {
    image: null,
  }

  render() {
    const { image } = this.props;

    if (!image) {
      return null;
    }

    return (
      <div className="Cat">
        <img src={image} alt="" className="Cat__image"/>
      </div>
    );
  }
}
