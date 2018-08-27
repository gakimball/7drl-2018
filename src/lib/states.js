import { moveEntity, advanceConversation, navigateConversation, makeConversationSelection, useItem, navigateGangBattleMenu, makeBattleMenuSelection } from './actions';
import { calculateDamage } from './utils';

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
    case '1':
    case '2':
      game.runAction(useItem, player, parseInt(event.key, 10) - 1);
      break;
    default:
      handled = false;
  }

  return handled;
};

FieldState.controls = game => [
  {
    key: 'Arrows',
    action: 'Move',
  },
  ...game.getPlayer().inventory.contents.map((item, index) => ({
    key: index + 1,
    action: item.item.name,
  })),
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

TextBoxState.controls = game => [
  ...(game.getTextarea().choices.length === 0 ? [] : [{
    key: 'Arrows',
    action: 'Select',
  }]),
  {
    key: 'Space',
    action: 'Continue',
  },
];

export const GangBattleState = (game, gang) => {
  const handler = event => {
    let handled = true;

    switch (event.key) {
      case ' ':
        game.runAction(makeBattleMenuSelection, handler);
        break;
      case 'ArrowUp':
        game.runAction(navigateGangBattleMenu, handler, 'up');
        break;
      case 'ArrowDown':
        game.runAction(navigateGangBattleMenu, handler, 'down');
        break;
      default:
        handled = false;
    }

    return handled;
  };

  handler.getGang = () => gang;
  handler.slots = {
    friendly: [null, null, null],
    enemy: [null, null, null],
  };
  handler.choice = 0;
  handler.page = 0;
  handler.calculateDamage = () => calculateDamage(handler.slots.friendly, handler.slots.enemy);

  return handler;
};

GangBattleState.controls = game => [
  {
    key: 'Arrows',
    action: 'Select',
  },
  {
    key: 'Space',
    action: 'Assign',
  },
  ...(game.getActiveState().slots.friendly[0] !== null ? [
    {
      key: 'Esc',
      action: 'Undo',
    }
  ] : []),
];
