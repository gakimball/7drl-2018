import { Drawable, Location, Solid, Living, Playable } from './components';
import { componentPropertyName } from './utils';

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

export const Player = [[Drawable, { character: '@' }], Location, Solid, Living, Playable];

export const Wall = [[Drawable, { character: '#' }], Location, Solid];
