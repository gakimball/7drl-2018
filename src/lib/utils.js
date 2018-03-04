import rot from 'rot-js';
import randomInt from 'random-int';
import arrayShuffle from 'array-shuffle';
import { responseTypes, catResponses, sampleQuestion } from './constants';
import questions from './questions';

export function createLevel() {
  const levelWidth = 15;
  const levelHeight = 10;
  const maze = new rot.Map.EllerMaze(levelWidth, levelHeight);
  const map = createEmptyArray(levelWidth, levelHeight, false);

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

  const question = questionsUnused.splice(randomInt(questionsUsed.length - 1), 1)[0];
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
