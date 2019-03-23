import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class HelpInstructions extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            How To Cook with Julia
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Press <strong>START</strong> to enable Julia
          </p>
          <p>
            You can ask Julia any of the following commands preceeded with "Hey
            Julia"
          </p>
          <hr />
          <p>
            "Hey Julia, Help" <br />
            "Hey Julia, Repeat" <br />
            "Hey Julia, Back" <br />
            "Hey Julia, Next" <br />
            "Hey Julia, Ingredients" <br />
            "Hey Julia, Instructions" <br />
            "Hey Julia, Stop" <br />
            "Hey Julia, Back to Recipe" <br />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>GOT IT</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default HelpInstructions
