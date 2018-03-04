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
    // Total size of camera
    const camera = {
      width: 23,
      height: 11,
    };
    // Distance from player (in the center) we can render
    const distance = {
      width: Math.floor(camera.width / 2),
      height: Math.floor(camera.height / 2),
    }
    // Min/max x coordinates needed to render something
    const xCoords = {
      min: player.location.x - distance.width,
      max: player.location.x + distance.width,
    }
    // Min/max y coordinates needed to render something
    const yCoords = {
      min: player.location.y - distance.height,
      max: player.location.y + distance.height,
    }
    // Coordinates at which top left of map would be drawn
    const mapOrigin = {
      x: distance.width - player.location.x,
      y: distance.height - player.location.y,
    }
    const map = createEmptyArray(camera.width, camera.height, ' ');

    entities.forEach(entity => {
      const { x, y } = entity.location;

      if (
        x >= xCoords.min && x <= xCoords.max
        && y >= yCoords.min && y <= yCoords.max
      ) {
        const { character, color } = entity.drawable;

        map[mapOrigin.y + y][mapOrigin.x + x] = { character, color };
      }
    });

    if (player) {
      map[player.location.y + mapOrigin.y][player.location.x + mapOrigin.x] = {
        character: player.drawable.character,
        color: player.drawable.color,
      };
    }

    return children(map);
  }
}
