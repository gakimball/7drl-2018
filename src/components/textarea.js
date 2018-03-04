import { Component } from 'react';
import PropTypes from 'prop-types';
import wordwrap from 'wordwrap';

const wrap = wordwrap(1, 52);

export default class Textarea extends Component {
  static propTypes = {
    children: PropTypes.func,
    textarea: PropTypes.shape({
      text: PropTypes.string,
      choices: PropTypes.array,
    }),
  }

  static defaultProps = {
    children: () => {},
    textarea: null,
  }

  render() {
    const { children, textarea } = this.props;

    if (!textarea) {
      return children([]);
    }

    const text = wrap(textarea.text);
    const characters = [
      '',
      ...text.split('\n')
    ];

    return children(characters);
  }
}
