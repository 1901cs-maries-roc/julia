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
    console.log('props in submit modal', this.props)
    console.log('state in submit modal', this.state)
    if (this.props.newRecipeId && !this.state.show) {
      this.setState({show: true})
    } else if (this.props.error && !this.state.show) {
      this.setState({show: true})
    }
  }

  handleClose = () => {
    this.setState({show: false})
    this.props.resetForm()
    this.props.acknowledgeError()
  }

  render() {
    console.log('in render: ', this.props)
    const {error} = this.props
    const recipeUrl = `${window.location.origin}/recipes/${
      this.props.newRecipeId
    }`
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
