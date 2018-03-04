import React, { Component } from 'react';
import PropTypes from 'prop-types';
import boxes from 'cli-boxes';
import './display.css';

export default class Display extends Component {
  static propTypes = {
    border: PropTypes.oneOf([
      true,
      false,
      ...Object.keys(boxes),
    ]),
    characters: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ])),
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  }

  static defaultProps = {
    border: true,
    characters: [],
    x: 0,
    y: 0,
  }

  get boxCharacters() {
    const { border } = this.props;

    return boxes[border === true ? 'single' : border];
  }

  getHorizontalBorder(bottom = false) {
    const { width } = this.props;
    const box = this.boxCharacters;
    const string = Array(width - 2).fill(box.horizontal);

    string.unshift(bottom ? box.bottomLeft : box.topLeft);
    string.push(bottom ? box.bottomRight : box.topRight);

    return string;
  }

  line(line, index, edge) {
    const { border, width } = this.props;
    const padding = border && width - line.length - 2;

    return (
      <div key={index} className="Display__line">
        {border && edge && this.character(this.boxCharacters.vertical)}
        {[...line].map((char, index) => this.character(char, index))}
        {border && edge && Array(padding).fill(' ').map((_, i) => this.character(' ', `padding-${i}`))}
        {border && edge && this.character(this.boxCharacters.vertical)}
      </div>
    );
  }

  character(char, index) {
    return (
      <div key={index} className="Display__character">
        {char}
      </div>
    );
  }

  render() {
    const { border, characters, height, width, x, y } = this.props;
    const padding = border && height - characters.length - 2;

    return (
      <div className="Display" style={{
        width: `${width * 13}px`,
        height: `${height * 20}px`,
        position: 'absolute',
        left: `${x * 13}px`,
        top: `${y * 20}px`,
      }}>
        {border && this.line(this.getHorizontalBorder(), -1)}
        {characters.map((line, index, arr) =>
          this.line(line, index, true)
        )}
        {border && Array(padding).fill('').map((line, index) =>
          this.line(Array(width - 2).fill(' '), index, true),
        )}
        {border && this.line(this.getHorizontalBorder(true), -2)}
      </div>
    );
  }
}
