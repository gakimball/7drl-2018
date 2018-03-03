import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './container.css';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children, height, width } = this.props;

    return (
      <div className="Container" style={{
        width: `${width * 13}px`,
        height: `${height * 20}px`,
      }}>
        {children}
      </div>
    )
  }
}
