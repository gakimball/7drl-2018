import rot from 'rot-js';
import randomInt from 'random-int';
import arrayShuffle from 'array-shuffle';
import dotProp from 'dot-prop';
import { responseTypes, catResponses, floorNames, angryCatPenaltyProbabilities, catClasses } from './constants';
import questions from './questions';

export function createMaze(width, height) {
  const maze = new rot.Map.EllerMaze(width, height);
  const map = createEmptyArray(width, height, false);

  maze.create((x, y, cell) => {
    map[y][x] = cell === 1;
  });

  return map;
}

const FUNCTION_NAME = /function\s+([^\s(]+)/;

export function componentPropertyName(Component) {
  const name = getName(Component);
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function getName(f) {
  let name = '';

  if (f instanceof Function) {
    if (f.name) {
      return f.name;
    }

    const match = f.toString().match(FUNCTION_NAME);

    if (match) {
      name = match[1];
    }
  } else if (f && f.constructor instanceof Function) {
    name = getName(f.constructor);
  }

  return name;
}

export function getDirectionalCoords(x, y, direction) {
  let nextX = x;
  let nextY = y;

  switch (direction) {
    case 'up':
      nextY--;
      break;
    case 'down':
      nextY++;
      break;
    case 'left':
      nextX--;
      break;
    case 'right':
      nextX++;
      break;
    default:
  }

  return {
    x: nextX,
    y: nextY,
  };
}

export function createEmptyArray(width, height, content = false) {
  return Array(height).fill('').map(() => Array(width).fill(content));
}

export function randomOf(array) {
  if (Array.isArray(array)) {
    return randomOfArray(array);
  }

  return array[randomOfArray(Object.values(array))];
}

function randomOfArray(array) {
  return array[randomInt(array.length - 1)];
}

const questionsUsed = [];
const questionsUnused = [...questions];

export function createQuestion(personality, onChoice) {
  if (questionsUnused.length === 0) {
    questionsUnused.push(...questionsUsed);
    questionsUsed.length = 0;
  }

  const question = questionsUnused.splice(randomInt(questionsUnused.length - 1), 1)[0];
  questionsUsed.push(question)
  const response = catResponses[personality];
  const options = Object.values(responseTypes).filter(r => r !== response.likes);

  options.splice(randomInt(2), 1);
  options.push(response.likes);

  return [
    {
      text: `"${question.text}"`,
    },
    {
      choices: arrayShuffle(Object.entries(question.answers))
        .filter(([type]) => options.includes(type))
        .map(([type, text]) => ({ type, text })),
      onChoice,
    },
  ];
}

export function createFloorName() {
  const { names, descriptors } = floorNames;

  return `${randomOf(names)} of ${randomOf(descriptors)}`;
}

export function createAngryCatPenalty() {
  const diceRoll = randomInt(1, 100);
  let baseProbability = 0;

  for (const [outcome, probability] of Object.entries(angryCatPenaltyProbabilities)) {
    baseProbability += probability;

    if (diceRoll <= baseProbability) {
      return outcome;
    }
  }
}

export function calculateDamage(player, enemy) {
  return {
    friendly: calculateDamageDealtBy(player, enemy),
    enemy: calculateDamageDealtBy(enemy, player),
  };
}

export function calculateDamageDealtBy(source, target) {
  // Damage types
  const Damage = {
    Physical: 'Physical',
    Magic: 'Magic',
  };

  const damageDealt = source.reduce((damage, cat) => {
    if (cat === null) {
      return damage;
    }

    switch (cat.feline.class) {
      case catClasses.Warrior:
        return damage.concat([Damage.Physical]);
      case catClasses.Wizard:
        return damage.concat([Damage.Magic]);
      default:
        return damage;
    }
  }, []);

  const finalDamage = target.reduce((damage, cat) => {
    if (cat === null) {
      return damage;
    }

    if (cat.feline.class === catClasses.Defender) {
      const index = damage.indexOf(Damage.Physical);

      if (index > -1) {
        return damage.splice(index, 1);
      }

      return damage;
    }

    return damage;
  }, damageDealt);

  return finalDamage.length;
}

export function alphabetizeBy(prop) {
  return (a, b) => {
    const valueA = dotProp.get(a, prop).toUpperCase();
    const valueB = dotProp.get(b, prop).toUpperCase();

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  };
}

export function uuid() {
  const length = 6;

  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
