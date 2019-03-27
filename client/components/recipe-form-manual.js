import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {addRecipeThunk, updateRecipeThunk} from '../store/recipe'
import {connect} from 'react-redux'
import AddUrl from './recipe-form-addUrl'
import SubmittedModal from './recipe-form-submitted'
import Collapse from 'react-bootstrap/Collapse'
import {withRouter} from 'react-router'

class RecipeFormManual extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   name: '' || this.props.currentRecipe.name,
    //   imgUrl: '/recipe-default.jpg',
    //   prepTime: 0,
    //   cookTime: 0,
    //   totalTime: 0,
    //   serving: 0,
    //   steps: [],
    //   ingredients: [],
    //   validated: false,
    //   newRecipeId: 0,
    //   isSaving: false,
    //   isEditForm: false
    // }
    // this.baseState = this.state
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/recipes/addrecipe')
      this.setState({isEditForm: true})
  }

  // resetForm = () => {
  //   this.setState(this.baseState)
  // }

  // addOrUpdateRecipe = async (event, dispatchRecipe) => {
  //   event.preventDefault()
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation()
  //   } else {
  //     const recipe = {
  //       // id: this.match.params.recipeId
  //       imgUrl: this.state.imgUrl,
  //       name: this.state.name,
  //       prepTime: this.state.prepTime,
  //       cookTime: this.state.cookTime,
  //       totalTime: this.state.totalTime,
  //       serving: this.state.serving,
  //       steps: this.state.steps,
  //       ingredients: this.state.ingredients
  //     }
  //     this.setState({isSaving: true})
  //     await dispatchRecipe(recipe)
  //     if (!this.state.isEditForm) {
  //       const newRecipeId = this.props.newRecipe.id
  //       this.setState({newRecipeId, isSaving: false})
  //     }
  //   }
  //   this.setState({validated: true})
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   })
  // }

  handleSubmit = e => {
    console.log('manual state in handlesubmit', this.state)
    if (!this.state.isEditForm) {
      this.addOrUpdateRecipe(e, this.props.addRecipeThunkDispatch)
    } else {
      this.addOrUpdateRecipe(e, this.props.updateRecipeThunkDispatch)
    }
  }

  render() {
    console.log(this.props)
    const {
      validated,
      // newRecipeId,
      // isSaving,
      imgUrl,
      name,
      steps,
      prepTime,
      cookTime,
      totalTime,
      serving,
      ingredients
    } = this.props
    console.log('state in form manual', this.state)
    return (
      <Form onSubmit={this.handleSubmit} noValidate validated={validated}>
        {/* <SubmittedModal newRecipeId={newRecipeId} resetForm={this.resetForm} /> */}
        <Row>
          <Form.Row className="recipe-time">
            <Form.Group as={Col} md="2">
              <Form.Label>Prep Time in min</Form.Label>
              <Form.Control
                placeholder="00"
                id="prepTime"
                value={prepTime}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Cook Time in min</Form.Label>
              <Form.Control
                placeholder="00"
                id="cookTime"
                value={cookTime}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Total Time in min</Form.Label>
              <Form.Control
                placeholder="00"
                id="totalTime"
                value={totalTime}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Number of servings</Form.Label>
              <Form.Control
                type="number"
                id="serving"
                placeholder="0"
                value={serving}
                required
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a serving.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="8">
              <Form.Group as={Col} md="12">
                <Form.Label>Recipe Title</Form.Label>

                <Form.Control
                  id="name"
                  required={true}
                  placeholder="Enter title"
                  value={name}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a title.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  id="ingredients"
                  value={ingredients}
                  required
                  // &#10 triggers a new line to show user an ex
                  placeholder="Ingredient 1 &#10;Ingredient 2 &#10;Ingredient 3"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  Enter each ingredient on its own line.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter ingredients.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  id="steps"
                  value={steps}
                  required
                  placeholder="Instruction 1 &#10;Instruction 2 &#10;Instruction 3"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  Enter each instruction on its own line.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter instructions.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Group as={Col} md="12">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  placeholder="ex: https://png.pngtree.com/element_origin_min_pic/16/07/09/155780a93ebd512.jpg "
                  id="imgUrl"
                  value={imgUrl}
                  onChange={this.handleChange}
                />
                <img
                  src={imgUrl}
                  style={{width: '200px'}}
                  alt="Recipe preview"
                />
              </Form.Group>
              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="submit-button"
                >
                  <h4>Submit Recipe</h4>
                </Button>
              </Form.Group>
            </Form.Group>
          </Form.Row>
        </Row>
      </Form>
    )
  }
}

const mapState = state => ({
  newRecipe: state.recipe.recipe
})

const mapDispatch = dispatch => {
  return {
    addRecipeThunkDispatch: recipe => dispatch(addRecipeThunk(recipe)),
    updateRecipeThunkDispatch: recipe => dispatch(updateRecipeThunk(recipe))
  }
}

export default withRouter(connect(mapState, mapDispatch)(RecipeFormManual))
