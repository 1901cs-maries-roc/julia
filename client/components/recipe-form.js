import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'
import InputGroup from 'react-bootstrap/InputGroup'
import PhotoAdd from './photo-add'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class RecipeForm extends Component {
  constructor() {
    super()
    this.state = {
      // manualEnter: false,
      name: '',
      imgUrl: '',
      prepTime: 0,
      cookTime: 0,
      waitTime: 0,
      serving: 0,
      steps: [],
      ingredients: []
      // tags: ''
    }
    this.createPhoto = this.createPhoto.bind(this)
    // this.manuallyEnter = this.manuallyEnter.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      name: '',
      imgUrl: '',
      prepTime: 0,
      cookTime: 0,
      waitTime: 0,
      serving: 0,
      steps: [],
      ingredients: [],
      tags: ''
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  // manuallyEnter = event => {
  //   console.log('in manually enter')
  //   event.preventDefault()
  //   console.log('state before', this.state)
  //   this.setState = {
  //     manualEnter: true
  //   }
  //   console.log('state after', this.state)
  // }

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
    // console.log('state in render', this.state)
    return (
      <Container className="container">
        <Row>
          <div>
            <h1>Add a recipe</h1>
          </div>
        </Row>
        <hr />
        <Row>
          <h2>Add a recipe from a URL</h2>
        </Row>
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
        <hr />

        <Form>
          <h2>Manually Enter a Recipe</h2>
          <Row>
            <Col>
              {/* <Figure> */}
              {/* <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src="/imgPlaceholder.svg"
            /> */}
              {/* <Figure.Caption>Upload a picture here.</Figure.Caption> */}
              <PhotoAdd createPhoto={this.createPhoto} />
              {/* <Button variant="primary" type="submit">
              Upload
            </Button> */}
              {/* </Figure> */}
              <Form.Row>
                <Form.Group controlId="formPrepTime">
                  <Form.Label>Prep Time</Form.Label>
                  <Form.Control type="number" id="prepTime" />
                </Form.Group>

                <Form.Group controlId="formCookTime">
                  <Form.Label>Cook Time</Form.Label>
                  <Form.Control type="number" id="cookTime" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group controlId="formWaitTime">
                  <Form.Label>Wait Time</Form.Label>
                  <Form.Control type="number" id="waitTime" />
                </Form.Group>

                <Form.Group controlId="serving">
                  <Form.Label>Number of servings</Form.Label>
                  <Form.Control type="number" id="serving" />
                </Form.Group>
              </Form.Row>
            </Col>
            <Col>
              <Form.Row>
                <Form.Group md="6" controlId="formName">
                  <Form.Label>Recipe Title</Form.Label>
                  <Form.Control id="name" placeholder="Enter title" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group controlId="formIngredients">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    id="ingredients"
                    placeholder="Enter one ingredient"
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
                  />
                  <Form.Text className="text-muted">
                    Enter each instruction on its own line.
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              {/* <Form.Row>
                <Form.Group controlId="formTags">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control as="select">
                    <option>Choose...</option>
                    <option>Easy</option>
                    <option>Intermediate</option>
                    <option>Hard</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row> */}

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

export default RecipeForm
