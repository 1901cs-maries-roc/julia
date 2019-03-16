import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk} from '../store'

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
    this.props.history.push('/recipe-step')
  }

  render() {
    const {
      id,
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
    console.log(this.props.currentRecipe)
    return (
      <div>
        <img src={imgUrl} />
        <h1>Recipe Title: {name}}</h1>
        <p>Prep Time: {prepTime}</p>
        <p>Cooking Time: {cookTime}</p>
        <p>Wait Time: {waitTime}</p>
        <p>Serving Size: {serving}</p>
        {/* add average time per user */}
        <p>Average Time for Users: No user data at this time</p>
        <div id="ingredient-list">
          <p>Ingredients:</p>
          <ul>
            {ingredients ? (
              ingredients.map(ingredient => {
                const quantity = ingredient.recipeIngredient.quantity
                return (
                  <li key={ingredient.id}>
                    {quantity} {ingredient.name}
                  </li>
                )
              })
            ) : (
              <li>No Ingredients</li>
            )}
            {/* <p>{steps}</p> */}
          </ul>
        </div>
        <div id="recipe-steps">
          <p>Instructions:</p>
          <ul>
            {steps ? (
              steps.map((step, index) => {
                return <li key={id + index}>{step}</li>
              })
            ) : (
              <li>No Steps</li>
            )}
            {/* <p>{steps}</p> */}
          </ul>
        </div>
        <div id="tags">
          {/* add reference to tags */}
          <p>Tags:</p>
          <ul>
            {tags === [] ? (
              tags.map((tag, index) => {
                return <li key={tag.id + index}>{tag}</li>
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
    currentRecipe: state.recipe
  }
}

const mapDispatch = dispatch => {
  return {
    getRecipeThunkDispatch: recipeId => dispatch(getRecipeThunk(recipeId))
  }
}

export default connect(mapState, mapDispatch)(RecipeOverview)
