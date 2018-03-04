import { moveEntity, advanceConversation } from './actions';

export const FieldState = game => event => {
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

FieldState.controls = [
  {
    key: 'Arrows',
    action: 'Move',
  },
];

export const TextBoxState = (game, textareas) => {
  const queue = textareas;
  const handler = event => {
    let handled = true;

    switch (event.key) {
      case ' ':
        game.runAction(advanceConversation, handler);
        break;
      default:
        handled = false;
    }

    return handled;
  };

  handler.next = () => queue.shift();

  return handler;
}

TextBoxState.controls = [
  {
    key: 'Space',
    action: 'Continue',
  },
];
