import React from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {browserCompatibility} from '../annyangCommands'

class BrowserAlert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {show: true}
  }

  render() {
    const handleHide = () => this.setState({show: false})
    const handleShow = () => this.setState({show: true})
    return (
      <>
        <Alert show={this.state.show} variant="success">
          <Alert.Heading>Warning</Alert.Heading>
          <p>{browserCompatibility()}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-success">
              Got It!
            </Button>
          </div>
        </Alert>

        {!this.state.show && <Button onClick={handleShow}>Show Alert</Button>}
      </>
    )
  }
}

export default BrowserAlert
