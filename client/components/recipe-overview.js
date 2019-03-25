import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk, clearCurrentRecipe} from '../store'
import IngredientsList from './ingredientsList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import DeleteModal from './recipe-delete-confirmation'

class RecipeOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteClicked: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipeThunkDispatch(recipeId)
  }

  componentDidUpdate() {
    console.log('Overview state: ', this.state)
    // if (this.state.deleteClicked) this.setState({deleteClicked: false})
  }

  componentWillUnmount() {
    clearCurrentRecipe()
  }
  handleClick(event) {
    event.preventDefault()
    const recipeId = this.props.match.params.recipeId
    this.props.history.push(`/recipes/${recipeId}/cooking`)
  }

  delete = () => {
    this.setState({deleteClicked: true})
  }

  edit() {}

  render() {
    const {
      name,
      imgUrl,
      cookTime,
      prepTime,
      totalTime,
      serving,
      steps,
      ingredients,
      id
    } = this.props.currentRecipe

    return (
      <Container className="container">
        <DeleteModal deleteClicked={this.state.deleteClicked} recipeId={id} />
        <Row>
          <Col md={{span: 5, offset: 1}}>
            <img
              src={
                imgUrl === 'recipe-default.jpg'
                  ? `${window.location.origin}/${imgUrl}`
                  : imgUrl
              }
              className="image-overview justify-content-md-center"
            />
          </Col>
          <Col md={{span: 5, offset: 1}} className="recipeBar">
            <Row>
              <Button
                onClick={() => this.setState({open: !open})}
                variant="outline-secondary"
                size="sm"
              >
                Edit
              </Button>
              <Button onClick={this.delete} variant="outline-danger" size="sm">
                Delete
              </Button>
            </Row>
            <h1>{name}</h1>
            <p>
              <strong>Prep Time:</strong> {prepTime} minutes
            </p>
            <p>
              <strong>Cooking Time:</strong> {cookTime} minutes
            </p>
            <p>
              <strong>Total Time:</strong> {totalTime} minutes
            </p>
            <p>
              <strong>Serving Size:</strong> {serving}
            </p>
            <ButtonToolbar className="start-button">
              <Button
                variant="success"
                type="button"
                onClick={this.handleClick}
                size="lg"
              >
                Start Cooking
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row className="row-grid">
          <Col md={{span: 5, offset: 1}}>
            <div id="recipe-steps">
              <h3>Ingredients:</h3>
              <IngredientsList ingredients={ingredients} isOverview={true} />
            </div>
          </Col>
          <Col md={{span: 5, offset: 1}}>
            <h3>Instructions:</h3>
            <ol>
              {steps ? (
                steps.map(step => {
                  return <li key={step}>{step}</li>
                })
              ) : (
                <li>No Steps</li>
              )}
            </ol>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    currentRecipe: state.recipe.recipe
  }
}

const mapDispatch = dispatch => {
  return {
    getRecipeThunkDispatch: recipeId => dispatch(getRecipeThunk(recipeId))
  }
}

export default connect(mapState, mapDispatch)(RecipeOverview)
