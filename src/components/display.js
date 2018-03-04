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
      // A row can be one string of characters
      PropTypes.string,
      // A row can be an array of characters
      PropTypes.arrayOf(PropTypes.oneOfType([
        // A character can be a string
        PropTypes.string,
        // A character can be an object with color metadata
        PropTypes.exact({
          character: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        }),
      ])),
    ])),
    height: PropTypes.number.isRequired,
    render: PropTypes.node,
    width: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  }

  static defaultProps = {
    border: true,
    characters: [],
    render: null,
    x: 0,
    y: 0,
  }

  get boxCharacters() {
    const { border } = this.props;

    return boxes[border === true ? 'single' : border];
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.characters.length !== nextProps.characters.length) {
      return true;
    }

    for (const index in this.props.characters) {
      const currentRow = [...this.props.characters[index]].join('');
      const nextRow = [...nextProps.characters[index]].join('');

      if (currentRow !== nextRow) {
        return true;
      }
    }

    return false;
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
    const styled = typeof char === 'object';

    return (
      <div key={index} className="Display__character" style={{ color: char.color }}>
        {styled ? char.character : char}
      </div>
    );
  }

  render() {
    const { border, characters, height, render, width, x, y } = this.props;
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
        {render}
      </div>
    );
  }
}
