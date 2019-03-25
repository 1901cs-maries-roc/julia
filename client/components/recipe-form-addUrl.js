import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export default function AddUrl({
  handleChange,
  scrape,
  newRecipeId,
  isSaving,
  scrapeUrl
}) {
  let icon
  if (isSaving) {
    icon = (
      <Spinner animation="border" as="span" role="status" size="sm">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  } else if (newRecipeId) {
    icon = '✓'
  } else {
    icon = 'Add'
  }
  return (
    <div>
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
            id="scrapeUrl"
            value={scrapeUrl}
            onChange={handleChange}
          />
          <InputGroup.Append>
            <Button variant="primary" type="button" onClick={scrape}>
              {icon}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </div>
  )
}
