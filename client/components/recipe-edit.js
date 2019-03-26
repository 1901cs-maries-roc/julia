import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk, clearCurrentRecipe} from '../store'
import Container from 'react-bootstrap/Container'
import RecipeFormManual from './recipe-form-manual'

class RecipeEdit extends Component {
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
    console.log('current recipe', this.props.currentRecipe)
    return (
      <Container>
        <RecipeFormManual currentRecipe={this.props.currentRecipe} />
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

export default connect(mapState, mapDispatch)(RecipeEdit)
