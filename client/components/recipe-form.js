import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
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
      imgUrl: '',
      prepTime: 0,
      cookTime: 0,
      waitTime: 0,
      serving: 0,
      steps: [],
      ingredients: [],
      validated: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      console.log(this.state)
      this.props.addRecipeThunkDispatch(this.state)
      this.props.history.push('/')
    }
    this.setState({validated: true})
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    const {validated} = this.state
    const imgUrl = this.state.imgUrl.length
      ? this.state.imgUrl
      : '/recipe-default.jpg'
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
        <Form
          onClick={e => this.handleSubmit(e)}
          noValidate
          validated={validated}
        >
          <Row>
            <Col>
              <Col>
                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    placeholder="ex: https://png.pngtree.com/element_origin_min_pic/16/07/09/155780a93ebd512.jpg "
                    id="imgUrl"
                    onChange={this.handleChange}
                  />
                  <img
                    src={imgUrl}
                    style={{width: '200px'}}
                    alt="Recipe preview"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>Prep Time in min</Form.Label>
                    <Form.Control
                      placeholder="60"
                      id="prepTime"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Cook Time in min</Form.Label>
                    <Form.Control
                      placeholder="30"
                      id="cookTime"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>
              </Col>
              <Col>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>Total Time in min</Form.Label>
                    <Form.Control
                      placeholder="90"
                      id="waitTime"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Number of servings</Form.Label>
                    <Form.Control
                      type="number"
                      id="serving"
                      placeholder="4"
                      required
                      onChange={this.handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a serving.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Col>
            </Col>
            <Col>
              <Form.Row>
                <Form.Group>
                  <Form.Label>Recipe Title</Form.Label>

                  <Form.Control
                    id="name"
                    required={true}
                    placeholder="Enter title"
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a title.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    id="ingredients"
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
              </Form.Row>

              <Form.Row>
                <Form.Group>
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    id="steps"
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
              </Form.Row>

              <Button variant="primary" type="submit">
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
