import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wait from 'wait-then';
import './player.css';

const leadingZero = n => n < 10 ? `0${n}` : n;
const images = Array(15).fill('').map((_, i) =>
  require(`../images/knight/Tuscan_Walk_500${leadingZero(i)}.png`),
);

export default class Player extends Component {
  static propTypes = {
    walking: PropTypes.bool,
  }

  static defaultProps = {
    walking: false,
  }

  state = {
    step: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.walking && !nextProps.walking) {
      this.setState({
        step: 0,
      });
    }
  }

  async componentDidUpdate() {
    if (this.props.walking) {
      const nextStep = this.state.step + 1;

      await wait(1000 / 24);
      this.setState({
        step: nextStep > 14 ? 0 : nextStep,
      });
    }
  }

  render() {
    const { step } = this.state;

    return (
      <div className="Player">
        <img src={images[step]} alt="" className="Player__image"/>
      </div>
    )
  }
}
