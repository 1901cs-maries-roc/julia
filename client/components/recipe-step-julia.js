import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Julia({listening, processing}) {
  // have placeholder Julia with prompt
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
      <i className={`fas fa-microphone fa-2x ${voiceState.micState}`} />
      <span className="micro-text">{voiceState.displayTxt}</span>
    </div>
  )
}
