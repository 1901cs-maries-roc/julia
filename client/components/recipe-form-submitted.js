import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default class SubmittedModal extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      closeClicked: false
    }
  }

  componentDidUpdate = () => {
    if (this.props.newRecipeId && !this.state.show && !this.state.closeClicked)
      this.setState({show: true})
  }

  handleClose = () => {
    this.setState({show: false, closeClicked: true})
    this.props.resetForm()
  }

  render() {
    const recipeUrl = `${window.location.origin}/recipes/${
      this.props.newRecipeId
    }`
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You can view your recipe <a href={recipeUrl}>here</a>.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Add another recipe
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
