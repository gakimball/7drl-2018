import React, { Component } from 'react';
import Game from '../lib/game';
import { createEmptyArray } from '../lib/utils';
import Container from './container';
import Display from './display';
import Player from './player';
import Encounter from './encounter';
import './app.css';

class App extends Component {
  state = {
    playerWalking: false,
    ready: false,
  }

  constructor(props) {
    super(props);

    this.game = new Game(() => this.forceUpdate());
  }

  componentDidMount() {
    this.game.start();

    this.setState({
      ready: true,
    });
  }

  map() {
    const map = createEmptyArray(15, 10, ' ');

    this.game.getDrawableEntities().forEach(entity => {
      const { x, y } = entity.location;
      const { character, color } = entity.drawable;

      map[y][x] = { character, color };
    });

    const player = this.game.getPlayer();

    if (player) {
      map[player.location.y][player.location.x] = {
        character: player.drawable.character,
        color: player.drawable.color,
      };
    }

    return map;
  }

  render() {
    const { playerWalking, ready } = this.state;

    if (!ready) {
      return null;
    }

    const encounter = this.game.getCurrentEncounter();

    console.log(encounter);

    return (
      <div className="App">
        <Container width={80} height={30}>
          <Player key="player" walking={playerWalking} />
          {encounter && <Encounter key="cat" image={encounter.image} />}
          <Display
            x={0}
            y={0}
            width={55}
            height={20}
            characters={encounter ? ['', ` ${encounter.name}`] : []}
          />
          <Display
            border
            x={55}
            width={25}
            height={12}
            characters={this.map()}
            debug
          />
          <Display
            border
            x={55}
            y={12}
            width={25}
            height={18}
          />
          <Display
            border
            y={20}
            width={55}
            height={10}
          />
        </Container>
      </div>
    );
  }
}

export default App;
