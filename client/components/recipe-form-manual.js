import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {addRecipeThunk, updateRecipeThunk} from '../store/recipe'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class RecipeFormManual extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/recipes/addrecipe')
      this.setState({isEditForm: true})
  }

  handleSubmit = e => {
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
      imgUrl,
      name,
      steps,
      prepTime,
      cookTime,
      totalTime,
      serving,
      ingredients,
      handleChange,
      handleSubmit
    } = this.props
    return (
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
          <Form.Row className="recipe-time">
            <Form.Group as={Col} md="2">
              <Form.Label>Prep Time in min</Form.Label>
              <Form.Control
                placeholder="00"
                id="prepTime"
                value={prepTime}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Cook Time in min</Form.Label>
              <Form.Control
                placeholder="00"
                id="cookTime"
                value={cookTime}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Total Time in min</Form.Label>
              <Form.Control
                placeholder="00"
                id="totalTime"
                value={totalTime}
                onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
