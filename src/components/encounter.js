import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './encounter.css';

export default class Encounter extends PureComponent {
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
      <div className="Encounter">
        <img src={image} alt="" className="Encounter__image"/>
      </div>
    );
  }
}
