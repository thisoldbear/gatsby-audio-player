import React, { Component } from 'react'

import { AudioContext } from '../context/audio'

import Audio from './audio'

class Player extends Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => <Audio audioSrc={context.audioSrc} />}
      </AudioContext.Consumer>
    )
  }
}

export default Player
