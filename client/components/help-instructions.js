import React, {Component} from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

class HelpInstructions extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleClick = ({target}) => {
      this.setState(s => ({target, show: !s.show}))
    }
    this.attachRef = target => this.setState({target})
    this.state = {
      show: true
    }
  }

  render() {
    const {show, target} = this.state
    return (
      <div>
        <ButtonToolbar>
          <Button
            className="back-button right"
            size="sm"
            variant="outline-dark"
            ref={this.attachRef}
            id="help"
            onClick={this.handleClick}
          >
            Help
          </Button>
        </ButtonToolbar>

        <Overlay
          target={target}
          show={show}
          placement="bottom-end"
          container={this}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <div id="close-help">
              <a
                onClick={() => this.setState({show: !show})}
                className="close"
                id="hide"
              >
                &times;
              </a>
            </div>
            <div id="help-header">
              <strong className="helpIntro">
                {' '}
                PRESS <i className="far fa-play-circle fa-1x" /> TO ENABLE JULIA
              </strong>{' '}
            </div>
            <hr />
            You can ask Julia any of the following commands preceeded with "Hey
            Julia..."
            <hr />
            <strong>Commands: </strong> <br />
            "Hey Julia, Help" <br />
            "Hey Julia, Repeat" <br />
            "Hey Julia, Back" <br />
            "Hey Julia, Next" <br />
            "Hey Julia, Ingredients" <br />
            "Hey Julia, Instructions" <br />
            "Hey Julia, Stop" <br />
            "Hey Julia, Back to Recipe" <br />
            <br />
          </Popover>
        </Overlay>
      </div>
    )
  }
}
export default HelpInstructions
