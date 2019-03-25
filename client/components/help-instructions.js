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
            className="navigation-button"
            variant="secondary"
            ref={this.attachRef}
            id="help"
            onClick={this.handleClick}
          >
            Help
          </Button>
          <Overlay
            target={target}
            show={show}
            placement="right"
            container={this}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              <br />
              <i className="far fa-play-circle fa-1x" />
              <strong>
                {' '}
                PRESS{' '}
                <img src="/start-button.png" alt="start-button" width={30} /> TO
                ENABLE JULIA
              </strong>{' '}
              <br />
              <hr />
              You can ask Julia any of the following commands preceeded with
              "Hey Julia"
              <hr />
              <strong>Commands: </strong> <br />
              "Hey Julia Help" <br />
              "Hey Julia Repeat" <br />
              "Hey Julia Back" <br />
              "Hey Julia Next" <br />
              "Hey Julia Ingredients" <br />
              "Hey Julia Instructions" <br />
              "Hey Julia Stop" <br />
              "Hey Julia Back to Recipe" <br />
              <br />
              <Button size="sm" onClick={() => this.setState({show: !show})}>
                GOT IT
              </Button>
            </Popover>
          </Overlay>
        </ButtonToolbar>
      </div>
    )
  }
}
export default HelpInstructions
