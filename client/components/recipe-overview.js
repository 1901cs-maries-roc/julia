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
    startCooking()
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
            <h1>Recipe Title: {name}</h1>
            <p>Prep Time: {prepTime} minutes</p>
            <p>Cooking Time: {cookTime} minutes</p>
            <p>Wait Time: {waitTime} minutes</p>
            <p>Serving Size: {serving}</p>
            {/* add average time per user */}
            <p>Average Time for Users: No user data at this time</p>
            <div id="ingredient-list">
              <p>Ingredients:</p>
              {ingredients ? (
                <IngredientsList ingredients={ingredients} isOverview={true} />
              ) : (
                <p>No Ingredients</p>
              )}
            </div>
          </Col>
        </Row>
        <Row className="row-grid">
          <div id="recipe-steps">
            <p>Instructions:</p>
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
        </Row>
        <Row className="row-grid">
          <ButtonToolbar>
            <Button variant="success" type="button" onClick={this.handleClick}>
              Start Cooking
            </Button>
          </ButtonToolbar>
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
