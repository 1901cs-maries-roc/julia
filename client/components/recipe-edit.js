import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecipeThunk, clearCurrentRecipe} from '../store'
import Container from 'react-bootstrap/Container'
import RecipeFormUpdated from './recipe-form-updated'
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
      newRecipeId: 0,
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

  resetForm = () => {
    this.setState(this.baseState)
  }

  addOrUpdateRecipe = async (event, dispatchRecipe) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const recipe = {
        // id: this.match.params.recipeId
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
      await dispatchRecipe(recipe)
      if (!this.state.isEditForm) {
        const newRecipeId = this.props.newRecipe.id
        this.setState({newRecipeId, isSaving: false})
      }
    }
    this.setState({validated: true})
  }

  render() {
    return (
      <Container>
        {/* <RecipeFormUpdated currentRecipe={this.props.currentRecipe} /> */}
        <RecipeFormManual {...this.state} />
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
