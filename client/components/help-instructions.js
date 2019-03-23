import React from 'react'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'

export default class HelpInstructions extends React.Component {
  constructor(...args) {
    super(...args)

    this.attachRef = target => this.setState({target})
    this.state = {
      show: true
    }
  }

  render() {
    const {show, target} = this.state
    return (
      <>
        <Button
          className="navigation-button"
          variant="secondary"
          ref={this.attachRef}
          id="help"
          onClick={() => this.setState({show: !show})}
        >
          Help
        </Button>
        <Overlay target={target} show={show} placement="right">
          {({placement, scheduleUpdate, arrowProps, ...props}) => (
            <div
              {...props}
              style={{
                backgroundColor: '#cdd0d6',
                padding: '2px 10px',
                color: 'black',
                borderRadius: 3,

                ...props.style
              }}
            >
              <br />
              <i className="far fa-play-circle" fa-10x />
              <strong> Press START to enable Julia</strong> <br />
              <hr />
              You can ask Julia any of the <br />
              following commands preceeded <br />
              with "Hey Julia"
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
            </div>
          )}
        </Overlay>
      </>
    )
  }
}
