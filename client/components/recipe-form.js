import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import PhotoAdd from './photo-add'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {addRecipeThunk} from '../store'
import {connect} from 'react-redux'

class RecipeForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      // imgUrl: '',
      prepTime: 0,
      cookTime: 0,
      waitTime: 0,
      serving: 0,
      steps: [],
      ingredients: []
    }
    this.createPhoto = this.createPhoto.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addRecipeThunkDispatch(this.state)
    this.props.history.push('/')
  }

  handleChange = event => {
    console.log(event.target)
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  createPhoto(newPhoto) {
    console.log('PHOTO:', newPhoto.image)
    const h = {} //headers
    let data = new FormData()
    data.append('image', newPhoto.image)
    data.append('name', newPhoto.name)
    h.Accept = 'application/json' //if you expect JSON response
    fetch('/api/recipes', {
      method: 'POST',
      headers: h,
      body: data
    })
      .then(response => {})
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <Container className="container">
        <Row>
          <h1>Add a recipe</h1>
        </Row>

        <Row className="row-grid">
          <h4>Add a recipe from a URL</h4>
        </Row>
        <Row>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="uploadUrl">Recipe URL</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder="Enter the URL"
              aria-label="Recipe URL"
              aria-describedby="uploadUrl"
            />
            <Button variant="primary" type="button">
              Upload
            </Button>
          </InputGroup>
        </Row>

        <Row className="row-grid">
          <h4>Manually Enter a Recipe</h4>
        </Row>
        <Form>
          <Row>
            <Col>
              <PhotoAdd createPhoto={this.createPhoto} />
              <Form.Row>
                <Form.Group controlId="formPrepTime">
                  <Form.Label>Prep Time</Form.Label>
                  <Form.Control
                    type="number"
                    id="prepTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCookTime">
                  <Form.Label>Cook Time</Form.Label>
                  <Form.Control
                    type="number"
                    id="cookTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
            </Col>
            <Col>
              <Form.Row>
                <Form.Group controlId="formWaitTime">
                  <Form.Label>Wait Time</Form.Label>
                  <Form.Control
                    type="number"
                    id="waitTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="serving">
                  <Form.Label>Number of servings</Form.Label>
                  <Form.Control
                    type="number"
                    id="serving"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
            </Col>
            <Col>
              <Form.Row>
                <Form.Group controlId="formName">
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Enter title"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group controlId="formIngredients">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    id="ingredients"
                    placeholder="Enter one ingredient"
                    onChange={this.handleChange}
                  />
                  <Form.Text className="text-muted">
                    Enter each ingredient on its own line.
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group controlId="formInstructions">
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="2"
                    id="steps"
                    placeholder="Enter one instruction"
                    onChange={this.handleChange}
                  />
                  <Form.Text className="text-muted">
                    Enter each instruction on its own line.
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addRecipeThunkDispatch: recipe => dispatch(addRecipeThunk(recipe))
  }
}

export default connect(null, mapDispatch)(RecipeForm)
