import { EntityManager } from 'tiny-ecs';
import randomInt from 'random-int';
import { createLevel } from './utils';
import createEntityFactory, { Player, Wall, randomCat } from './entities';
import { Drawable, Location, Playable, Encounterable, Solid } from './components';
import { moveEntity } from './actions';

export default class Game {
  constructor(onTick = () => {}) {
    this.entities = new EntityManager();
    this.level = createLevel();
    this.createEntity = createEntityFactory(this.entities);
    this.onTick = onTick;
    this.eventLog = [];

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
    const createAtRandom = (entity) => {
      const x = randomInt(14);
      const y = randomInt(9);

      if (this.getEntitiesAtLocation(x, y).length > 0) {
        createAtRandom(entity);
      } else {
        this.createEntity(entity, {
          location: { x, y },
        });
      }
    }

    createAtRandom(Player);
    createAtRandom(randomCat());

    this.tick();
  }

  handleKey = e => {
    const player = this.getPlayer();
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

  event(type, data = {}) {
    this.eventLog.push({ type, data });
  }

  getPlayer() {
    return this.entities.queryComponents([Playable])[0];
  }

  getCurrentEncounter() {
    const { x, y } = this.getPlayer().location;

    const target = this.entities
      .queryComponents([Encounterable])
      .filter(entity => entity.location.x === x && entity.location.y === y)[0];

    if (target) {
      return target.encounterable;
    }

    return null;
  }

  getEntitiesAtLocation(targetX, targetY, solidOnly = false) {
    const entities = this.entities.queryComponents([Location]);

    return entities.reduce((list, entity) => {
      const { x, y } = entity.location;

      if (targetX === x && targetY === y && (!solidOnly || entity.hasComponent(Solid))) {
        return list.concat([entity]);
      }

      return list;
    }, []);
  }

  getDrawableEntities() {
    return this.entities.queryComponents([Drawable, Location])
  }

  runAction(action, ...args) {
    action(this, ...args);
    this.tick();
  }

  tick() {
    this.onTick(this.eventLog);
    this.eventLog = [];
  }
}
