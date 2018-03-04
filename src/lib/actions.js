import { Location } from './components';
import { getDirectionalCoords } from './utils';

// Move an entity one square in a direction
export function moveEntity(game, entity, direction) {
  const { x, y } = getDirectionalCoords(entity.location.x, entity.location.y, direction);

  placeEntity(game, entity, x, y);
}

// Place an entity in a specific location
export function placeEntity(game, entity, x, y) {
  const targets = game.getEntitiesAtLocation(x, y, true);

  if (targets.length === 0) {
    if (!entity.hasComponent(Location)) {
      entity.addComponent(Location);
    }

    entity.location.x = x;
    entity.location.y = y;
  }
}

// Remove an entity from the physical world
export function removeFromWorld(game, entity) {
  entity.removeComponent(Location);
}
