import { Component } from 'react';
import PropTypes from 'prop-types';
import { catClasses } from '../lib/constants';

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
    const classes = Object.keys(catClasses);
    const characters = [
      '',
      `Life: ${player.playable.life}`,
      '',
      `Kindness: ${player.playable.kindness}`,
      `Humor: ${player.playable.humor}`,
      `Seriousness: ${player.playable.seriousness}`,
      `Weirdness: ${player.playable.weirdness}`,
      '',
      ...classes
        .map(cls => {
          const count = player.party.contents.filter(cat => cat.feline.class === cls).length;

          return [cls, count];
        })
        .filter(([cls, count]) => count > 0)
        .map(([cls, count]) => `${cls}s: ${count}`),
    ].map(line => ` ${line}`);

    return children(characters);
  }
}
