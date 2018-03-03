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
  }

  static defaultProps = {
    border: true,
    characters: [],
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

  line(line, edge) {
    const { border, width } = this.props;
    const padding = border && width - line.length - 2;

    return (
      <div key={line} className="Display__line">
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
    const { border, characters, height, width } = this.props;

    return (
      <div className="Display" style={{
        width: `${width * 13}px`,
        height: `${height * 20}px`,
      }}>
        {border && this.line(this.getHorizontalBorder())}
        {characters.map((line, index, arr) =>
          this.line(line, index === 0 || index === arr.length - 1)
        )}
        {border && this.line(this.getHorizontalBorder(true))}
      </div>
    );
  }
}
