import catNames from 'cat-names';
import { Drawable, Location, Solid, Living, Playable, Encounterable, Feline, Party } from './components';
import { componentPropertyName, randomOf } from './utils';
import { catBreeds, catGenders, catPersonalities, catClasses } from './constants';

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

export const Player = [[Drawable, { character: '@', color: '#5fbcff' }], Location, Solid, Living, Playable, Party];

export const Wall = [[Drawable, { character: '•', color: '#ccc' }], Location, Solid];

export const randomCat = () => [
  [Drawable, {
    character: '?',
    color: '#f18282',
  }],
  Location,
  Living,
  [Encounterable, {
    image: require('../images/cats/cat.png'),
    name: catNames.random(),
  }],
  [Feline, {
    gender: randomOf(catGenders),
    breed: randomOf(catBreeds),
    personality: randomOf(catPersonalities),
    mood: 0,
    class: randomOf(catClasses),
  }],
];
