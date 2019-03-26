import React, {Component} from 'react'
import Row from 'react-bootstrap/Row'

export default class StepNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    if (!this.state.playing) {
      this.setState({playing: true})
      this.props.annyang()
    } else {
      this.setState({playing: false})
      this.props.stop()
    }
  }

  render() {
    const {stepIndex, steps, goBack, goToNext} = this.props

    console.log('CURRENT STATE: ', this.state)
    return (
      <Row className="justify-content-md-center player">
        <div id="control-panel" className="control-panel">
          <div className="controls">
            <div
              id="prev"
              className="prev"
              onClick={goBack}
              disabled={stepIndex === 0}
            />
            <div
              className={!this.state.playing ? 'play' : 'stop'}
              onClick={this.handleClick}
            />
            <div
              className="next"
              onClick={goToNext}
              disabled={stepIndex >= steps.length - 1}
            />
          </div>
        </div>
      </Row>
    )
  }
}

{
  /* <ButtonToolbar className="all-navigation-button">
      <Button
        className="navigation-button"
        variant="secondary"
        id="back"
        type="button"
        disabled={stepIndex === 0}
        onClick={goBack}
      >
        Back
      </Button>
      <Button
        className="navigation-button"
        variant="secondary"
        id="next"
        disabled={stepIndex >= steps.length - 1}
        type="button"
        onClick={goToNext}
      >
        Next
      </Button>
      <Button
        className="navigation-button"
        variant="success"
        id="start"
        type="button"
        onClick={annyang}
      >
        Start
      </Button>
      <Button
        className="navigation-button"
        variant="danger"
        id="pause"
        type="button"
        onClick={stop}
      >
        Stop
      </Button>
    </ButtonToolbar> */
}

{
  /* <div id="play" className="play" onClick={this.handleClick} disabled={this.state.playing === false} />
<div id="play" className="stop" onClick={this.handleClick} disabled={this.state.playing === true} /> */
}
