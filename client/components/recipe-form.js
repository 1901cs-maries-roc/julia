import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class RecipeForm extends Component {
  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group controlId="formPrepTime">
            <Form.Label>Prep Time</Form.Label>
            <Form.Control type="prepTime" />
          </Form.Group>
          {/* </Form.Row>

        <Form.Row> */}
          <Form.Group controlId="formCookTime">
            <Form.Label>Cook Time</Form.Label>
            <Form.Control type="cookTime" />
          </Form.Group>
          {/* </Form.Row>

        <Form.Row> */}
          <Form.Group controlId="formWaitTime">
            <Form.Label>Wait Time</Form.Label>
            <Form.Control type="waitTime" />
          </Form.Group>
          {/* </Form.Row>

        <Form.Row> */}
          <Form.Group controlId="servings">
            <Form.Label>Number of servings</Form.Label>
            <Form.Control type="servings" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="formTitle">
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control type="title" placeholder="Enter title" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="formIngredients">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              type="ingredients"
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
              placeholder="Enter one instruction"
            />
            <Form.Text className="text-muted">
              Enter each instruction on its own line.
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="formTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control as="select">
              <option>Choose...</option>
              <option>Easy</option>
              <option>Intermediate</option>
              <option>Hard</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default RecipeForm
