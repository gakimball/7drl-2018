import { EntityManager } from 'tiny-ecs';
import { startGame } from './actions';
import createEntityFactory from './entities';
import { Drawable, Location, Playable, Encounterable, Solid, Feline } from './components';

export default class Game {
  constructor(onTick = () => {}) {
    this.entities = new EntityManager();
    this.createEntity = createEntityFactory(this.entities);
    this.onTick = onTick;
    this.eventLog = [];
    this.textarea = null;
    this.states = [];
    this.floor = 0;
    this.floorName = null;
    this.gangBattleInProgess = false;

    document.addEventListener('keydown', this.handleKey);
  }

  getGangs() {
    const battleState = this.states.filter(s => typeof s.getGang === 'function')[0];

    if (!battleState) {
      return null;
    }

    return {
      party: {
        friendly: this.getPlayer().party.contents,
        enemy: battleState.getGang().party.contents,
      },
      slots: battleState.slots,
      damage: battleState.calculateDamage(),
      menu: {
        choice: battleState.choice,
        page: battleState.page,
      },
    };
  }

  getPlayerParty() {
    const player = this.getPlayer();

    return this.entities
      .queryComponents([Feline])
      .filter(cat => player.party.contents.includes(cat));
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
    const { controls } = this.getActiveState();

    if (controls) {
      return controls(this);
    }

    return [];
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
    this.runAction(startGame);
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
