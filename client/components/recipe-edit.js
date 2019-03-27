import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk, clearCurrentRecipe, updateRecipeThunk} from '../store'
import Container from 'react-bootstrap/Container'
import SubmittedModal from './recipe-form-submitted'
import RecipeFormManual from './recipe-form-manual'

class RecipeEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imgUrl: '/recipe-default.jpg',
      prepTime: 0,
      cookTime: 0,
      totalTime: 0,
      serving: 0,
      steps: [],
      ingredients: [],
      validated: false,
      scrapeUrl: '',
      wasUpdated: false,
      isSaving: false,
      open: false
    }
  }

  async componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    await this.props.getRecipeThunkDispatch(recipeId)
    this.setState(this.props.currentRecipe)
  }

  componentWillUnmount() {
    clearCurrentRecipe()
  }

  handleChange = event => {
    let splittedValue
    if (event.target.id === 'steps' || event.target.id === 'ingredients') {
      splittedValue = event.target.value.split(',')
    } else {
      splittedValue = event.target.value
    }
    this.setState({
      [event.target.id]: splittedValue
    })
  }

  resetForm = () => {
    this.setState({wasUpdated: false})
  }

  addOrUpdateRecipe = async event => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const recipe = {
        id: this.props.match.params.recipeId,
        imgUrl: this.state.imgUrl,
        name: this.state.name,
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        totalTime: this.state.totalTime,
        serving: this.state.serving,
        steps: this.state.steps,
        ingredients: this.state.ingredients
      }
      this.setState({isSaving: true})
      await this.props.updateRecipeThunkDispatch(recipe)
      this.setState({wasUpdated: true, isSaving: false})
    }
    this.setState({validated: true})
  }

  render() {
    return (
      <Container>
        <SubmittedModal
          wasUpdated={this.state.wasUpdated}
          resetForm={this.resetForm}
          updatedRecipeId={this.props.match.params.recipeId}
        />
        <RecipeFormManual
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.addOrUpdateRecipe}
        />
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
    getRecipeThunkDispatch: recipeId => dispatch(getRecipeThunk(recipeId)),
    updateRecipeThunkDispatch: recipe => dispatch(updateRecipeThunk(recipe))
  }
}

export default connect(mapState, mapDispatch)(RecipeEdit)
