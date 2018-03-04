import { EntityManager } from 'tiny-ecs';
import randomInt from 'random-int';
import { createLevel } from './utils';
import createEntityFactory, { Player, Wall } from './entities';
import { Drawable, Location, Playable } from './components';
import { moveEntity } from './actions';

export default class Game {
  constructor(onTick = () => {}) {
    this.entities = new EntityManager();
    this.level = createLevel();
    this.createEntity = createEntityFactory(this.entities);
    this.onTick = onTick;

    document.addEventListener('keydown', this.handleKey);
  }

  start() {
    // Create walls
    this.level.forEach((row, y) => row.forEach((col, x) => {
      if (col) {
        this.createEntity(Wall, {
          location: { x, y },
        });
      }
    }));

    // Create player
    const createPlayer = () => {
      const x = randomInt(14);
      const y = randomInt(9);

      if (this.getEntitiesAtLocation(x, y)) {
        createPlayer();
      } else {
        this.createEntity(Player, {
          location: { x, y },
        });
      }
    }

    createPlayer();

    this.tick();
  }

  handleKey = e => {
    const player = this.entities.queryComponents([Playable])[0];
    let handled = true;

    switch (e.key) {
      case 'ArrowUp':
        this.runAction(moveEntity, player, 'up');
        break;
      case 'ArrowDown':
        this.runAction(moveEntity, player, 'down');
        break;
      case 'ArrowLeft':
        this.runAction(moveEntity, player, 'left');
        break;
      case 'ArrowRight':
        this.runAction(moveEntity, player, 'right');
        break;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();
    }
  }

  getEntitiesAtLocation(targetX, targetY) {
    const entities = this.entities.queryComponents([Location]);

    for (const entity of entities) {
      const { x, y } = entity.location;

      if (targetX === x && targetY === y) {
        return entity;
      }
    }

    return null;
  }

  getDrawableEntities() {
    return this.entities.queryComponents([Drawable, Location])
  }

  runAction(action, ...args) {
    action(this, ...args);
    this.tick();
  }

  tick() {
    this.onTick();
  }
}
