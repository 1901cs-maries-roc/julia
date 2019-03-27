import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

const NoMatch = () => {
  return (
    <Container className="container">
      <br />
      <Row className="justify-content-md-center">
        <h3>Sorry, this page doesn't exist!</h3>
      </Row>
      <Row className="justify-content-md-center">
        <img src="/404_Error.jpeg" />
      </Row>
      <Row className="justify-content-md-center">
        <Button href="/"> Back to Home </Button>
      </Row>
    </Container>
  )
}

export default NoMatch
