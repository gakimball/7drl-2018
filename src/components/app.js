import React, { Component } from 'react';
import Container from './container';
import Display from './display';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container width={80} height={30}>
          <Display width={20} height={20} characters={['Hello world']} />
          <Display width={20} height={20} characters={['Hello world']} />
        </Container>
      </div>
    );
  }
}

export default App;
