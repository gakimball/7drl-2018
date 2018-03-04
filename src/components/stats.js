import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Stats extends Component {
  static propTypes = {
    children: PropTypes.func,
    player: PropTypes.object.isRequired,
  }

  static defaultProps = {
    children: () => {},
  }

  render() {
    const { player, children } = this.props;
    const characters = [
      '',
      `Life: ${player.playable.life}`,
      '',
      `Kindness: ${player.playable.kindness}`,
      `Humor: ${player.playable.humor}`,
      `Seriousness: ${player.playable.seriousness}`,
      `Uncertainty: ${player.playable.uncertainty}`,
    ].map(line => ` ${line}`);

    return children(characters);
  }
}
