import { EntityManager } from 'tiny-ecs';
import { createLevel } from './actions';
import createEntityFactory from './entities';
import { Drawable, Location, Playable, Encounterable, Solid } from './components';

export default class Game {
  constructor(onTick = () => {}) {
    this.entities = new EntityManager();
    this.createEntity = createEntityFactory(this.entities);
    this.onTick = onTick;
    this.eventLog = [];
    this.textarea = null;
    this.states = [];

    document.addEventListener('keydown', this.handleKey);
  }

  getTextarea() {
    return this.textarea;
  }

  setTextarea(props) {
    if (props === null) {
      this.textarea = null;
    }

    this.textarea = {
      text: '',
      choices: [],
      onChoice: () => {},
      onReveal: () => {},
      ...props
    };
  }

  getConversationChoice() {
    const state = this.getActiveState();

    // This is lazy type detection
    if (typeof state.next !== 'undefined') {
      return state.choice;
    }
  }

  getControls() {
    return this.getActiveState().controls;
  }

  pushState(state, ...args) {
    const handler = state(this, ...args);

    handler.controls = state.controls;
    this.states.unshift(handler);

    return handler;
  }

  popState() {
    this.states.shift();
  }

  start() {
    this.runAction(createLevel);
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
      .queryComponents([Encounterable, Location])
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
