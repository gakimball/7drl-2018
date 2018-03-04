import React, { Component } from 'react';
import wait from 'wait-then';
import Game from '../lib/game';
import { PLAYER_MOVED } from '../lib/events';
import Container from './container';
import Display from './display';
import Player from './player';
import Encounter from './encounter';
import Map from './map';
import Stats from './stats';
import './app.css';

class App extends Component {
  state = {
    playerWalking: false,
    ready: false,
  }

  constructor(props) {
    super(props);

    this.game = new Game(this.handleTick);
  }

  componentDidMount() {
    this.game.start();

    this.setState({
      ready: true,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!prevState.playerWalking && this.state.playerWalking) {
      await wait(1000 / 24 * 15);

      this.setState({
        playerWalking: false,
      });
    }
  }

  handleTick = events => {
    let updateQueued = true;

    for (const event of events) {
      switch (event.type) {
        case PLAYER_MOVED:
          this.setState({
            playerWalking: true,
          });
          break;
        default:
          updateQueued = false;
      }
    }

    if (!updateQueued) {
      this.forceUpdate();
    }
  };

  render() {
    const { playerWalking, ready } = this.state;

    if (!ready) {
      return null;
    }

    const player = this.game.getPlayer();
    const encounter = this.game.getCurrentEncounter();

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
          <Map
            player={player}
            entities={this.game.getDrawableEntities()}
          >{characters => (
            <Display
              border
              x={55}
              width={25}
              height={12}
              characters={characters}
              debug
            />
          )}</Map>
          <Stats player={player}>{characters => (
            <Display
              border
              x={55}
              y={12}
              width={25}
              height={18}
              characters={characters}
            />
          )}</Stats>
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
