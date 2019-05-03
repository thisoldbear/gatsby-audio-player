import React, { Component, createContext } from 'react'

export const AudioContext = createContext()

class AudioContextProvider extends Component {
  state = {
    audioSrc: 'https://npr-poc-fe.netlify.com/audio/track-one.mp3',
  }

  setAudioSrc = newAudioSrc => {
    this.setState(() => ({
      audioSrc: newAudioSrc,
    }))
  }

  render() {
    return (
      <AudioContext.Provider
        value={{
          audioSrc: this.state.audioSrc,
          setAudioSrc: this.setAudioSrc,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    )
  }
}

export default AudioContextProvider
