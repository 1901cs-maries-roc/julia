import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk} from '../store'

class RecipeOverview extends Component {
  constructor() {
    super()
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
    console.log(this.props)
    return (
      <div>
        <h1>Recipe Title</h1>
        <p>Prep Time</p>
        <p>Cooking Time</p>
        <p>Serving Size</p>
        <p>Average Time for Users</p>
        <div id="ingredient-list">
          <ul>
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
          </ul>
        </div>
        <div id="recipe-steps">
          <ol>
            <li>Bake in preheated oven for 30 minutes. </li>
            <li>Step 2</li>
            <li>Step 3</li>
          </ol>
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
