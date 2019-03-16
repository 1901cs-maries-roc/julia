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
      tagId
    } = this.props.currentRecipe
    console.log(steps)
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
          <ul>
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
          </ul>
        </div>
        <div id="recipe-steps">
          <ul>
            {/* {steps.map((step, index) => {
              return (<li key={id + index}>{step}</li>)
            })} */}
            <p>{steps}</p>
          </ul>
        </div>
        <div id="tags">
          {/* add reference to tags */}
          <p>Tags: No tags</p>
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
