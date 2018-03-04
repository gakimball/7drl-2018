import { Component } from 'react';
import PropTypes from 'prop-types';
import wordwrap from 'wordwrap';

const wrapText = wordwrap(1, 52);
const wrapChoice = wordwrap(0, 50);

export default class Textarea extends Component {
  static propTypes = {
    children: PropTypes.func,
    selectedChoice: PropTypes.number,
    textarea: PropTypes.shape({
      text: PropTypes.string,
      choices: PropTypes.array,
    }),
  }

  static defaultProps = {
    children: () => {},
    selectedChoice: -1,
    textarea: null,
  }

  render() {
    const { children, selectedChoice, textarea } = this.props;

    if (!textarea) {
      return children([]);
    }

    const text = textarea.text ? wrapText(textarea.text).split('\n') : [];
    const choices = textarea.choices.map((choice, index) => {
      const wrappedText = wrapChoice(choice.text);
      const activeSelection = selectedChoice === index;
      const finalText = ` ${activeSelection ? '>' : ' '} ${wrappedText}`
        .split('\n')
        .map((val, i) => i > 0 ? `   ${val}` : val)

      return finalText;
    }).reduce((array, choice, index) => {
      const activeSelection = selectedChoice === index;

      return array.concat(
        activeSelection
          ? choice.map(line => line.split('').map(character => ({
            character,
            color: '#5fbcff',
          })))
          : choice
      );
    }, []);

    const characters = [
      '',
      ...text,
      ...choices,
    ];

    return children(characters);
  }
}
