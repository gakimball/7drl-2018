import randomInt from 'random-int';
import arrayShuffle from 'array-shuffle';
import { Location, Playable, Encounterable, Feline, Solid, Alluring } from './components';
import { getDirectionalCoords, createQuestion, createMaze, createFloorName, createAngryCatPenalty, randomOf } from './utils';
import { Wall, Player, randomCat, BookOfHints, Catnip } from './entities';
import { PLAYER_MOVED } from './events';
import { FieldState, TextBoxState } from './states';
import { catResponses, statGains, statLosses, statNames, angryCatSendoffs, angryCatPenaltyMessages, angryCatInsults, angryCatPenaltyTypes, catClasses, pronouns, smells, hints } from './constants';

export function startGame(game) {
  createLevel(game, 1);
  startConversation(game, [
    {
      text: 'You\'ve got a party to get to, but first you have to escape this dungeon.',
    },
    {
      text: 'Try making some friends along the way. Just be careful what you say to them.',
    },
  ]);
}

export function createLevel(game, floor) {
  game.pushState(FieldState);
  game.floor = floor;
  game.floorName = createFloorName();
  const width = 50;
  const height = 50;

  const level = createMaze(width, height);

  // Create walls
  level.forEach((row, y) => row.forEach((col, x) => {
    if (col) {
      game.createEntity(Wall, {
        location: { x, y },
      });
    }
  }));

  const createAtRandom = (entity) => {
    const x = randomInt(width - 1);
    const y = randomInt(height - 1);

    if (game.getEntitiesAtLocation(x, y).length > 0) {
      return createAtRandom(entity);
    } else {
      return game.createEntity(entity, {
        location: { x, y },
      });
    }
  }

  if (floor === 1) {
    // Create player
    createAtRandom(Player);

    // DEBUG
    giveItem(game, game.getPlayer(), BookOfHints);
    giveItem(game, game.getPlayer(), Catnip);
  }

  // Create cats
  for (let i = 0; i < 20; i++) {
    createAtRandom(randomCat());
    // addToParty(game, game.getPlayer(), createAtRandom(randomCat()));
  }
}

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
  const { name } = cat.encounterable;
  const { gender, breed, personality } = cat.feline;
  const a = char => char.toLowerCase()[0] === 'a' ? 'an' : 'a';

  startConversation(game, [
    {
      text: `You encounter ${name}, ${a(breed)} ${breed}. ${pronouns[gender]} fur looks soft and beautiful.\n\nYou sense that ${name} has ${a(personality)} ${personality.toLowerCase()} personality.`,
    },
  ], () => {
    removeFromWorld(game, cat);
  });

  if (game.getPlayer().hasComponent(Alluring)) {
    adjustCatMood(game, cat, 10);
    finishCatConversation(game, cat, game.getActiveState());
  } else {
    continueCatConversation(game, cat, game.getActiveState());
  }
}

export function continueCatConversation(game, cat, state) {
  const { name } = cat.encounterable;
  const { personality } = cat.feline;

  state.push(...createQuestion(personality, (state, choice) => {
    const { type } = choice;
    const responses = catResponses[personality];
    let emotionText;
    let statText;

    if (type === responses.likes) {
      const statGain = statGains[type];
      adjustCatMood(game, cat, 1);
      adjustPlayerStats(game, statGain, 1);
      emotionText = 'begins purring contentedly';
      statText = `gain +1 ${statNames[statGain]}`;
    } else if (responses.dislikes.includes(type)) {
      const statLoss = statLosses[type];
      adjustCatMood(game, cat, -1);
      adjustPlayerStats(game, statLoss, -1);
      emotionText = 'hisses at you';
      statText = `lose -1 ${statNames[statLoss]}`;
    } else {
      adjustCatMood(game, cat, 0);
      emotionText = 'doesn\'t seem phased';
    }

    state.push({
      text: `${name} ${emotionText}.${statText ? ` You ${statText}.` : ''}`,
    });

    deductCatQuestion(game, cat);

    if (cat.feline.questionsAsked > 2 || cat.feline.mood > 1 || cat.feline.mood < -1) {
      finishCatConversation(game, cat, state);
    } else {
      continueCatConversation(game, cat, state);
    }

    advanceConversation(game, state);
  }));
}

export function finishCatConversation(game, cat, state) {
  const { personality } = cat.feline;
  const { name } = cat.encounterable;
  const player = game.getPlayer();

  if (cat.feline.mood >= 1) {
    state.push({
      text: `${name} seems happy with you.`,
    });
    state.push({
      text: `"Are you headed to the party? I'm coming with you. You look like you could use a ${cat.feline.class} in your gang."`,
    });
    state.push({
      text: `${name} joins your party.`,
      onReveal: () => addToParty(game, player, cat),
    });
  } else if (cat.feline.mood >= 0) {
    state.push({
      text: `${name} seems unimpressed with you.`,
    });
  } else {
    state.push({
      text: `${name} seems annoyed with you.`,
    });
    state.push({
      text: `"${angryCatSendoffs[personality]}"`,
    });
    penalizePlayer(game, cat, state);
  }
}

export function penalizePlayer(game, cat, state) {
  const player = game.getPlayer();
  const { name } = cat.encounterable;
  const penalty = createAngryCatPenalty();
  const messageTemplate = angryCatPenaltyMessages[penalty];
  let messageText;
  let onReveal = () => {};

  switch (penalty) {
    case angryCatPenaltyTypes.Attack: {
      messageText = messageTemplate
        .replace('%s', name)
        .replace('%s', 1);
      onReveal = () => damageEntity(game, player, 1);
      break;
    }
    case angryCatPenaltyTypes.Insult: {
      const insults = angryCatInsults;
      const stats = Object.keys(insults);
      const stat = stats[randomInt(stats.length - 1)];

      messageText = messageTemplate
        .replace('%s', name)
        .replace('%s', angryCatInsults[stat])
        .replace('%s', statNames[stat]);
      onReveal = () => adjustPlayerStats(game, stat, -1);

      break;
    }
    case angryCatPenaltyTypes.Steal: {
      messageText = `${name} tries to steal from you, but you have nothing to steal.`;
      break;
    }
    default:
  }

  state.push({
    text: messageText,
    onReveal,
  });
}

export function startConversation(game, queue, onFinish = () => {}) {
  const state = game.pushState(TextBoxState, queue, onFinish);
  advanceConversation(game, state);
}

export function advanceConversation(game, state) {
  const textarea = state.next();
  game.setTextarea(textarea);
  game.getTextarea().onReveal();

  if (!textarea) {
    state.onFinish();
    game.popState();
  } else {
    if (game.getTextarea().choices.length > 0) {
      state.choice = 0;
    } else {
      state.choice = -1;
    }
  }
}

export function navigateConversation(game, state, direction) {
  const textarea = game.getTextarea();

  if (textarea.choices.length > 0) {
    if (direction === 'up' && state.choice > 0) {
      state.choice--;
    } else if (direction === 'down' && state.choice < textarea.choices.length - 1) {
      state.choice++;
    }
  }
}

export function makeConversationSelection(game, state) {
  const textarea = game.getTextarea();

  textarea.onChoice(state, textarea.choices[state.choice]);
}

export function adjustCatMood(game, cat, change) {
  cat.feline.mood += change;
}

export function adjustPlayerStats(game, stat, change) {
  game.getPlayer().playable[stat] += change;
}

export function deductCatQuestion(game, cat) {
  cat.feline.questionsAsked++;
}

export function addToParty(game, entity, member) {
  entity.party.contents.push(member);
}

export function damageEntity(game, entity, damage) {
  entity.living.health -= damage;

  if (entity.living.health <= 0) {
    killEntity(game, entity);
  }
}

export function healEntity(game, entity, damage) {
  entity.living.health += damage;

  if (entity.living.health > entity.living.maxHealth) {
    entity.living.health = entity.living.maxHealth;
  }
}

export function killEntity(game, entity) {
  entity.living.health = 0;
}

export function giveItem(game, entity, item) {
  const { inventory } = entity;

  if (inventory.contents.length < inventory.limit) {
    if (Array.isArray(item)) {
      inventory.contents.push(game.createEntity(item));
    } else {
      inventory.contents.push(item);
    }
  }
}

export function useItem(game, entity, index) {
  const { inventory } = entity;
  const item = inventory.contents[index];
  const used = item.item.effect(game, entity);

  if (used === false) {
    return;
  }

  inventory.contents.splice(index, 1);

  if (item.item.message !== null) {
    startConversation(game, [{
      text: item.item.message(game, entity),
    }], () => {
      item.remove();
    });
  }
}

export function initiateCatClassChange(game) {
  const classes = game.getPlayerParty().reduce((arr, cat) => {
    if (arr.includes(cat.feline.class)) {
      return arr;
    }

    return arr.concat([cat.feline.class]);
  }, []);

  if (classes.length === 0) {
    startConversation(game, [{
      text: 'You have no friends yet.'
    }], () => game.tick());
    return false;
  }

  let oldClass;

  startConversation(game, [
    {
      text: 'Select a class of cat to convert.',
    },
    {
      choices: classes.map(cls => ({ text: cls })),
      onChoice: pickClassChange,
    }
  ]);

  function pickClassChange(state, choice) {
    oldClass = choice.text;
    const newClasses = arrayShuffle(Object.keys(catClasses).filter(cls => cls !== oldClass)).slice(0, 3);

    state.push({
      text: `Select a new class for your ${oldClass}.`,
    });
    state.push({
      choices: newClasses.map(cls => ({
        text: cls,
      })),
      onChoice: confirmClassChange,
    });

    advanceConversation(game, state);
  }

  function confirmClassChange(state, choice) {
    const newClass = choice.text;
    const cats = game.getPlayerParty().filter(cat => cat.feline.class === oldClass);
    const cat = cats[randomInt(0, cats.length - 1)];
    const { name } = cat.encounterable;
    const { gender } = cat.feline;

    state.push({
      text: `${name} the ${oldClass} is now ${name} the ${newClass}. ${pronouns[gender]} fur still looks soft and beautiful.`,
      onReveal: () => changeCatClass(game, cat, newClass),
    });

    advanceConversation(game, state);
  }
}

export function changeCatClass(game, cat, newClass) {
  cat.feline.class = newClass;
}

export function applyCatnip(game) {
  const player = game.getPlayer();

  if (player.hasComponent(Alluring)) {
    startConversation(game, [{
      text: 'You\'ve already used catnip recently. You can\'t get any more alluring.',
    }]);

    return false;
  }

  player.addComponent(Alluring);
  startConversation(game, [{
    text: 'You sprinkle catnip on yourself. The next cat you meet will probably really like you.',
  }]);
}

export function giveHint(game) {
  startConversation(game, [
    {
      text: `You open the Book of Hints. It smells like ${randomOf(smells)}. The first page reads:`,
    },
    {
      text: `"${randomOf(hints)}"`,
    },
    {
      text: 'As you turn the page, the book vanishes into a puff of smoke. Typical.',
    },
  ]);
}
