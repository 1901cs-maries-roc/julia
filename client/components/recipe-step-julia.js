import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Julia({listening, processing}) {
  // have placeholder Julia with prompt
  return (
    listening &&
    (processing ? (
      <div className="julia">
        <Spinner animation="grow" variant="dark" />
        <i className="fas fa-microphone fa-2x microphone-off" />
        <span className="micro-text">Thinking...</span>
      </div>
    ) : (
      <div className="julia">
        <i className="fas fa-microphone fa-2x microphone-on" />
        <span className="micro-text">Listening...</span>
      </div>
    ))
  )
}
