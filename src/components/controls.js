import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Controls extends Component {
  static propTypes = {
    controls: PropTypes.arrayOf(PropTypes.exact({
      action: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    controls: [],
  }

  render() {
    const { controls, children } = this.props;
    const actionText = controls.map(action => `[${action.key}] ${action.action}`);

    return children([' ', ` ${actionText.join('  ')}`]);
  }
}
