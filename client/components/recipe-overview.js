import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk, clearCurrentRecipe} from '../store'
import IngredientsList from './ingredientsList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class RecipeOverview extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipeThunkDispatch(recipeId)
  }
  componentWillUnmount() {
    clearCurrentRecipe()
  }
  handleClick(event) {
    event.preventDefault()
    const recipeId = this.props.match.params.recipeId
    this.props.history.push(`/recipes/${recipeId}/cooking`)
  }

  render() {
    const {
      name,
      imgUrl,
      cookTime,
      prepTime,
      totalTime,
      serving,
      steps,
      ingredients
    } = this.props.currentRecipe

    return (
      <Container className="container">
        <Row>
          <Col xs="12" sm="12" md="12" lg="6">
            <img
              src={
                imgUrl === 'recipe-default.jpg'
                  ? `${window.location.origin}/${imgUrl}`
                  : imgUrl
              }
              className="image-overview"
            />
          </Col>

          <Col md={{span: 12, offset: 0.5}} lg={{span: 6, offset: 0.5}}>
            <h1>{name}</h1>
            <p>
              <strong>Prep Time:</strong>{' '}
              {prepTime ? `${prepTime} minutes` : 'N/A'}
            </p>
            <p>
              <strong>Cooking Time:</strong>{' '}
              {cookTime ? `${cookTime} minutes` : 'N/A'}
            </p>
            <p>
              <strong>Total Time:</strong>{' '}
              {totalTime ? `${totalTime} minutes` : 'N/A'}
            </p>
            <p>
              <strong>Serving Size:</strong> {serving ? serving : 'N/A'}
            </p>
            <ButtonToolbar className="start-button">
              <Button
                variant="success"
                type="button"
                size="lg"
                onClick={this.handleClick}
              >
                Start Cooking
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row className="row-grid">
          <Col md="12">
            <div id="recipe-steps">
              <h3>Ingredients:</h3>
              <IngredientsList ingredients={ingredients} isOverview={true} />
            </div>
          </Col>
          <Col md={{span: 12, offset: 0.5}}>
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
