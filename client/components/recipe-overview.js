import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk} from '../store'
import IngredientsList from './ingredientsList'
import {startCooking} from '../annyangCommands'
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
      waitTime,
      serving,
      steps,
      tags,
      ingredients
    } = this.props.currentRecipe

    return (
      <Container className="container">
        <Row>
          <Col>
            <img src={imgUrl} />
          </Col>
          <Col>
            <h1>{name}</h1>
            <p>
              <strong>Prep Time:</strong> {prepTime} minutes
            </p>
            <p>
              <strong>Cooking Time:</strong> {cookTime} minutes
            </p>
            <p>
              <strong>Wait Time:</strong> {waitTime} minutes
            </p>
            <p>
              <strong>Serving Size:</strong> {serving}
            </p>
            <div id="ingredient-list">
              <h3>Ingredients:</h3>
              {ingredients ? (
                <IngredientsList ingredients={ingredients} isOverview={true} />
              ) : (
                <p>No Ingredients</p>
              )}
            </div>
          </Col>
        </Row>
        <Row className="row-grid">
          <Col md={{span: 8, offset: 0}}>
            <div id="recipe-steps">
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
            </div>
          </Col>
          <Col md={{span: 2, offset: 2}}>
            <ButtonToolbar>
              <Button
                variant="success"
                type="button"
                onClick={this.handleClick}
              >
                Start Cooking
              </Button>
            </ButtonToolbar>
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
