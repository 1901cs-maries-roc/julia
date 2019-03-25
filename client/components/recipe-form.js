import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {addRecipeThunk, addRecipeFromUrl} from '../store/recipe'
import {connect} from 'react-redux'
import AddUrl from './recipe-form-addUrl'
import SubmittedModal from './recipe-form-submitted'
import Collapse from 'react-bootstrap/Collapse'

class RecipeForm extends Component {
  constructor() {
    super()
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
    this.baseState = this.state
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  scrape = async () => {
    this.setState({isSaving: true})
    await this.props.addRecipeFromUrl(this.state.scrapeUrl)
    const newRecipeId = this.props.newRecipe.id
    this.setState({newRecipeId, isSaving: false})
  }

  handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      const recipe = {
        imgUrl: this.state.imgUrl,
        name: this.state.name,
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        totalTime: this.state.totalTime,
        serving: this.state.serving,
        steps: this.state.steps,
        ingredients: this.state.ingredients
      }
      await this.props.addRecipeThunkDispatch(recipe)
      const newRecipeId = this.props.newRecipe.id
      this.setState({newRecipeId, isSaving: false})
    }
    this.setState({validated: true})
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log('after handlechange in form', this.state)
  }

  render() {
    const {
      validated,
      newRecipeId,
      isSaving,
      scrapeUrl,
      imgUrl,
      open,
      name,
      steps,
      ingredients
    } = this.state
    // imgUrl = imgUrl.length ? imgUrl : '/recipe-default.jpg'

    return (
      <Container className="container">
        <SubmittedModal newRecipeId={newRecipeId} resetForm={this.resetForm} />
        <Row>
          <h1>Add a recipe</h1>
        </Row>
        <AddUrl
          handleChange={this.handleChange}
          scrape={this.scrape}
          newRecipeId={newRecipeId}
          isSaving={isSaving}
          scrapeUrl={scrapeUrl}
        />
        <Row className="row-grid">
          <h4>Manually Enter a Recipe</h4>
        </Row>
        <Button
          onClick={() => this.setState({open: !open})}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Add
        </Button>

        <Collapse in={this.state.open}>
          <Form noValidate validated={validated}>
            <Row>
              <Form.Row className="recipe-time">
                <Form.Group as={Col} md="2">
                  <Form.Label>Prep Time in min</Form.Label>
                  <Form.Control
                    placeholder="00"
                    id="prepTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Cook Time in min</Form.Label>
                  <Form.Control
                    placeholder="00"
                    id="cookTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Total Time in min</Form.Label>
                  <Form.Control
                    placeholder="00"
                    id="totalTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Number of servings</Form.Label>
                  <Form.Control
                    type="number"
                    id="serving"
                    placeholder="0"
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
                      onClick={e => this.handleSubmit(e)}
                    >
                      <h4>Submit</h4>
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Form.Row>
            </Row>
          </Form>
        </Collapse>
      </Container>
    )
  }
}

const mapState = state => ({
  newRecipe: state.recipe.recipe
})

const mapDispatch = dispatch => {
  return {
    addRecipeThunkDispatch: recipe => dispatch(addRecipeThunk(recipe)),
    addRecipeFromUrl: url => dispatch(addRecipeFromUrl(url))
  }
}

export default connect(mapState, mapDispatch)(RecipeForm)
