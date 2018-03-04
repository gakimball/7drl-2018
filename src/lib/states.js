import { moveEntity } from './actions';

export const FieldState = (game, event) => {
  const player = game.getPlayer();
  let handled = true;

  switch (event.key) {
    case 'ArrowUp':
      game.runAction(moveEntity, player, 'up');
      break;
    case 'ArrowDown':
      game.runAction(moveEntity, player, 'down');
      break;
    case 'ArrowLeft':
      game.runAction(moveEntity, player, 'left');
      break;
    case 'ArrowRight':
      game.runAction(moveEntity, player, 'right');
      break;
    default:
      handled = false;
  }

  return handled;
};
