import { Location, Playable, Encounterable, Feline, Solid } from './components';
import { getDirectionalCoords } from './utils';
import { PLAYER_MOVED } from './events';
import { TextBoxState } from './states';

// Move an entity one square in a direction
export function moveEntity(game, entity, direction) {
  const { x, y } = getDirectionalCoords(entity.location.x, entity.location.y, direction);

  placeEntity(game, entity, x, y);
}

// Place an entity in a specific location
export function placeEntity(game, entity, x, y) {
  const targets = game.getEntitiesAtLocation(x, y);
  const blockingTargets = targets.filter(t => t.hasComponent(Solid));

  if (blockingTargets.length === 0) {
    if (!entity.hasComponent(Location)) {
      entity.addComponent(Location);
    }

    entity.location.x = x;
    entity.location.y = y;

    if (entity.hasComponent(Playable)) {
      game.event(PLAYER_MOVED);

      const encounter = targets.filter(t => t.hasComponent(Encounterable))[0];

      if (encounter) {
        beginEncounter(game, encounter);
      }
    }
  }
}

// Remove an entity from the physical world
export function removeFromWorld(game, entity) {
  entity.removeComponent(Location);
}

export function beginEncounter(game, encounter) {
  if (encounter.hasComponent(Feline)) {
    beginCatConversation(game, encounter);
  }
}

export function beginCatConversation(game, cat) {
  const pronouns = {
    female: 'Her',
    male: 'His',
    nonbinary: 'Their',
  };
  const { name } = cat.encounterable;
  const { gender, breed, personality } = cat.feline;
  const a = breed[0] === 'A' ? 'an' : 'a';

  startConversation(game, [
    {
      text: `You encounter ${name}, ${a} ${breed}. ${pronouns[gender]} fur looks soft and beautiful.\n\nPersonality: ${personality}`,
    },
  ]);
}

export function startConversation(game, queue) {
  const state = game.pushState(TextBoxState, queue);
  advanceConversation(game, state);
}

export function advanceConversation(game, state) {
  const textarea = state.next();
  game.setTextarea(textarea);

  if (!textarea) {
    game.popState();
  }
}
