import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import {clearError} from '../store'

//modal for url error/successful handling
class SubmittedModal extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  componentDidUpdate = () => {
    if (this.props.newRecipeId && !this.state.show) {
      this.setState({show: true})
    } else if (this.props.error && !this.state.show) {
      this.setState({show: true})
    } else if (this.props.wasUpdated && !this.state.show) {
      this.setState({show: true})
    }
  }

  handleClose = () => {
    this.setState({show: false})
    this.props.resetForm()
    this.props.acknowledgeError()
  }

  render() {
    const {error} = this.props
    const recipeId = this.props.newRecipeId || this.props.updatedRecipeId
    const recipeUrl = `${window.location.origin}/recipes/${recipeId}`
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{error ? 'Hm...' : 'Recipe saved!'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error ? (
              "We're having trouble finding a recipe on that page. You can still use our recipe form below to add it manually."
            ) : (
              <span>
                View your new recipe <a href={recipeUrl}>here</a>.
              </span>
            )}
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

const mapState = state => ({
  error: state.recipe.error
})

const mapDispatch = dispatch => ({
  acknowledgeError: () => dispatch(clearError())
})

export default connect(mapState, mapDispatch)(SubmittedModal)
