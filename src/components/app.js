import React, { Component } from 'react';
import Game from '../lib/game';
import { createEmptyArray } from '../lib/utils';
import Container from './container';
import Display from './display';
import Player from './player';
import Cat from './cat';
import './app.css';

class App extends Component {
  state = {
    playerWalking: false,
  }

  constructor(props) {
    super(props);

    this.game = new Game(() => this.forceUpdate());
  }

  componentDidMount() {
    this.game.start();
  }

  map() {
    const map = createEmptyArray(15, 10, ' ');

    this.game.getDrawableEntities().forEach(entity => {
      const { x, y } = entity.location;
      const { character, color } = entity.drawable;

      map[y][x] = { character, color };
    });

    return map;
  }

  render() {
    const { playerWalking } = this.state;

    return (
      <div className="App">
        <Container width={80} height={30}>
          <Display
            x={0}
            y={0}
            width={55}
            height={20}
            characters={['Hello world']}
            render={[
              <Player key="player" walking={playerWalking} />,
              <Cat key="cat" />
            ]}
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
