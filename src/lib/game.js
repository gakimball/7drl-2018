import { EntityManager } from 'tiny-ecs';
import randomInt from 'random-int';
import { createLevel } from './utils';
import createEntityFactory, { Player, Wall, randomCat } from './entities';
import { Drawable, Location, Playable, Encounterable, Solid } from './components';
import { FieldState } from './states';

export default class Game {
  constructor(onTick = () => {}) {
    this.entities = new EntityManager();
    this.level = createLevel();
    this.createEntity = createEntityFactory(this.entities);
    this.onTick = onTick;
    this.eventLog = [];
    this.textarea = [];
    this.states = [];

    document.addEventListener('keydown', this.handleKey);
  }

  getTextarea() {
    return this.textarea[0];
  }

  setTextarea(props) {
    this.textarea.unshift({
      text: '',
      choices: [],
      ...props
    });
  }

  getControls() {
    return this.getActiveState().controls;
  }

  popTextarea() {
    this.textarea.shift();
  }

  pushState(state, ...args) {
    this.states.unshift(state(this, ...args));
  }

  popState() {
    this.states.shift();
  }

  start() {
    this.pushState(FieldState);

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

  getActiveState() {
    return this.states[0];
  }

  handleKey = event => {
    const handled = this.getActiveState()(event);

    if (handled) {
      event.preventDefault();
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
