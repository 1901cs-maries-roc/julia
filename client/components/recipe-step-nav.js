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

    return (
      <div className="player">
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
    )
  }
}
