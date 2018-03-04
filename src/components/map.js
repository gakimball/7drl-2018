import { Component } from 'react';
import PropTypes from 'prop-types';
import { createEmptyArray } from '../lib/utils';

export default class Map extends Component {
  static propTypes = {
    children: PropTypes.func,
    player: PropTypes.object,
    entities: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    children: () => {},
    player: null,
    entities: [],
  }

  render() {
    const { children, player, entities } = this.props;
    const map = createEmptyArray(15, 10, ' ');

    entities.forEach(entity => {
      const { x, y } = entity.location;
      const { character, color } = entity.drawable;

      map[y][x] = { character, color };
    });

    if (player) {
      map[player.location.y][player.location.x] = {
        character: player.drawable.character,
        color: player.drawable.color,
      };
    }

    return children(map);
  }
}
