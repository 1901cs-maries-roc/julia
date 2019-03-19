import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk} from '../store'
import IngredientsList from './ingredientsList'

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
      <div>
        <img src={imgUrl} />
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

          {/* <ul>
            {ingredients ? (
              ingredients.map(ingredient => {
                const quantity = ingredient.recipeIngredient.quantity
                const measure = ingredient.recipeIngredient.measure
                return (
                  <li key={ingredient.id}>
                    {quantity} {measure} {ingredient.name}
                  </li>
                )
              })
            ) : (
              <li>No Ingredients</li>
            )}
          </ul> */}
        </div>
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
        <div id="tags">
          {/* add reference to tags */}
          <p>Tags:</p>
          <ul>
            {tags === [] ? (
              tags.map(tag => {
                return <li key={tag}>{tag}</li>
              })
            ) : (
              <li>No tags are available</li>
            )}
          </ul>
        </div>
        <button type="button" onClick={this.handleClick}>
          Start Cooking
        </button>
      </div>
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
