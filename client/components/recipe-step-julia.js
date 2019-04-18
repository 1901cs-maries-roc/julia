import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Julia({listening, processing}) {
  let voiceState
  if (listening && processing) {
    voiceState = {
      state: 'processing',
      micState: 'mic-processing',
      displayTxt: 'Thinking...'
    }
  } else if (listening && !processing) {
    voiceState = {
      state: 'standby',
      micState: 'mic-listening',
      displayTxt: 'Listening...'
    }
  } else {
    voiceState = {
      state: 'off',
      micState: 'mic-off',
      displayTxt: "Hi, I'm Julia. Press play to begin."
    }
  }
  return (
    <div className="julia">
      {voiceState.state === 'processing' && (
        <Spinner animation="grow" variant="dark" />
      )}
      <div id={voiceState.micState}>
        <i className="fas fa-microphone fa-2x" />
      </div>
      <span className="micro-text">{voiceState.displayTxt}</span>
    </div>
  )
}
