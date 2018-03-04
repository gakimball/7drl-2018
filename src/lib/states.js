import { moveEntity, advanceConversation, navigateConversation, makeConversationSelection } from './actions';

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

export const TextBoxState = (game, textareas = [], onFinish = () => {}) => {
  const queue = textareas;
  const handler = event => {
    let handled = true;

    switch (event.key) {
      case ' ':
        if (game.getTextarea().choices.length > 0) {
          game.runAction(makeConversationSelection, handler);
        } else {
          game.runAction(advanceConversation, handler);
        }
        break;
      case 'ArrowUp':
        game.runAction(navigateConversation, handler, 'up');
        break;
      case 'ArrowDown':
        game.runAction(navigateConversation, handler, 'down');
        break;
      default:
        handled = false;
    }

    return handled;
  };

  handler.next = () => queue.shift();
  handler.current = () => queue[0];
  handler.push = (...args) => queue.push(...args);
  handler.choice = -1;
  handler.onFinish = onFinish;

  return handler;
}

TextBoxState.controls = [
  {
    key: 'Space',
    action: 'Continue',
  },
];
