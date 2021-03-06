import catNames from 'cat-names';
import { Drawable, Location, Solid, Living, Playable, Encounterable, Feline, Party, Item, Inventory } from './components';
import { componentPropertyName, randomOf } from './utils';
import { catBreeds, catGenders, catPersonalities, catClasses, catClassMaxHealth } from './constants';
import { healEntity, initiateCatClassChange, applyCatnip, giveHint } from './actions';

export default manager => (type, props = {}) => {
  const entity = manager.createEntity();

  type.forEach(component => {
    if (Array.isArray(component)) {
      const [comp, defaultProps] = component;

      entity.addComponent(comp);
      Object.assign(entity[componentPropertyName(comp)], defaultProps);
    } else {
      entity.addComponent(component);
    }
  });

  Object.assign(entity, props);

  return entity;
};

export const Player = [
  [Drawable, {
    character: '@',
    color: '#5fbcff'
  }],
  Location,
  Solid,
  [Living, {
    health: 5,
    maxHealth: 5,
  }],
  Playable,
  Party,
  Inventory,
];

export const Wall = [[Drawable, { character: '■', color: '#ccc' }], Location, Solid];

export const randomCat = () => {
  const cls = randomOf(catClasses);
  const health = catClassMaxHealth[cls];

  return [
    [Drawable, {
      character: '?',
      color: '#f18282',
    }],
    Location,
    [Living, {
      health,
      maxHealth: health,
    }],
    [Encounterable, {
      image: require('../images/cats/cat.png'),
      name: catNames.random(),
    }],
    [Feline, {
      gender: randomOf(catGenders),
      breed: randomOf(catBreeds),
      personality: randomOf(catPersonalities),
      mood: 0,
      class: cls,
    }],
  ];
};

export const EnemyGang = [Party];

export const HealingPotion = [
  [Item, {
    name: 'Healing Potion',
    effect: (game, user) => {
      healEntity(game, user, 2);
    },
    message: (game, user) => 'You recover 2 health.',
  }],
];

export const SuperHealingPotion = [
  [Item, {
    name: 'Super Healing Potion',
    effect: (game, user) => {
      healEntity(game, user, 5);
    },
    message: (game, user) => 'You recover 5 health.',
  }],
];

export const CatSkillbook = [
  [Item, {
    name: 'Cat Skillbook',
    effect: (game) => {
      return initiateCatClassChange(game);
    },
  }]
]

export const Catnip = [
  [Item, {
    name: 'Catnip',
    effect: (game, user) => {
      return applyCatnip(game);
    },
  }]
];

export const BookOfHints = [
  [Item, {
    name: 'Book of Hints',
    effect: (game) => {
      giveHint(game);
    }
  }],
];
