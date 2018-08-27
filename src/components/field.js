import { Component } from 'react';
import PropTypes from 'prop-types';
import { alphabetizeBy } from '../lib/utils';

const alphabetize = alphabetizeBy('encounterable.name');

export default class Field extends Component {
  static propTypes = {
    children: PropTypes.func,
    encounter: PropTypes.object,
    floor: PropTypes.number,
  }

  static defaultProps = {
    children: () => {},
    encounter: null,
    floor: 0,
  }

  render() {
    const { children, encounter, floor, gangs } = this.props;

    if (encounter) {
      return children(['', ` ${encounter.name}`]);
    }

    if (!gangs) {
      return children(['', ` ${floor}`]);
    }

    const { party, slots, damage, menu } = gangs;

    const padString = str => str.padStart(20, ' ');

    const gangCount = gang => `${gang.filter(c => c.living.health > 0).length}/${gang.length}`;
    const friendlyGangCount = gangCount(party.friendly);
    const enemyGangCount = gangCount(party.enemy);

    const shortClass = cat => cat ? `${cat.feline.class.slice(0, 3)}.` : '    ';
    const health = cat => cat ? `♥${cat.living.health}` : '   ';
    const slot = cat => cat ? '[x]' : '[ ]';

    const friendlySlot = cat => `${shortClass(cat)} ${health(cat)} ${slot(cat)}`;
    const enemySlot = cat => `${slot(cat)} ${health(cat)} ${shortClass(cat)}`;

    const pageLength = 6;
    const totalPages = Math.ceil(party.friendly.length / pageLength);

    const slotsAt = index =>
      `${padString(friendlySlot(slots.friendly[index]))}  ${enemySlot(slots.enemy[index])}`;

    const startSlice = menu.page * pageLength;
    const endSlice = startSlice + pageLength;

    return children([
      `${padString('You')}  Enemy`,
      `${padString(friendlyGangCount)}  ${enemyGangCount}`,
      slotsAt(0),
      slotsAt(1),
      slotsAt(2),
      '',
      `${padString('Dmg Taken')}  Dmg Dealt`,
      `${padString(`-${damage.enemy}`)}  -${damage.friendly}`,
      '',
      ...[...party.friendly].sort(alphabetize).slice(startSlice, endSlice).map((cat, index) => {
        const isSelected = menu.choice === index;
        const str = ` ${isSelected ? '>' : ' '} ${cat.encounterable.name} / ${shortClass(cat)} / ${health(cat)}`;

        if (isSelected) {
          return [...str].map(character => ({ character, color: '#5fbcff' }));
        }

        return str;
      }),
      '',
      `   ${menu.page + 1}/${totalPages}`,
    ]);
  }
}
