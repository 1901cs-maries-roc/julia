import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {deleteRecipeThunk} from '../store'
import {withRouter} from 'react-router'

class DeleteModal extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      closeClicked: false
    }
  }

  componentDidUpdate = () => {
    console.log('Modal state: ', this.state)
    if (
      this.props.deleteClicked &&
      !this.state.show &&
      !this.state.closeClicked
    ) {
      // if (this.props.deleteClicked && !this.state.show)
      this.setState({show: true})
    }
  }

  handleDelete = () => {
    // this.setState({show: false, closeClicked: true})
    this.props.deleteRecipeThunkDispatch(this.props.recipeId)
    this.props.history.push('/')
  }

  handleEdit = () => {
    // this.setState({show: false, closeClicked: true})
    // this.props.resetForm()
    //redirect to edit page
  }

  handleClose = () => {
    this.setState({show: false, closeClicked: true})
    // this.setState({show: false})
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You will not be able to recover this recipe. Would you like to edit
            the recipe instead?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={this.handleDelete}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteRecipeThunkDispatch: recipeId => dispatch(deleteRecipeThunk(recipeId))
  }
}

export default withRouter(connect(null, mapDispatch)(DeleteModal))
