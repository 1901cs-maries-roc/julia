import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Container className="container">
      <Row>
        <Col md={{span: 4}}>
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="/placeholder.svg" />
            <Card.Body>
              <Card.Title>Welcome, {email}</Card.Title>
              <Card.Text>Quick blurb about user</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="/favorites">My Favorites</Card.Link>
              <Card.Link href="#">Edit Profile</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{span: 6}}>
          <h3>My Recipes:</h3>
          <Media>
            <img
              width={64}
              height={64}
              className="align-self-start mr-3"
              src="/placeholderSM.svg"
              alt="small placeholder"
            />
            <Media.Body>
              <h5>Media Heading</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin commodo. Cras purus odio,
                vestibulum in vulputate at,
              </p>
              <Button className="navigation-button" variant="secondary">
                Delete
              </Button>
            </Media.Body>
          </Media>
          <br />
          <hr />
          <Media>
            <img
              width={64}
              height={64}
              className="align-self-start mr-3"
              src="/placeholderSM.svg"
              alt="small placeholder"
            />
            <Media.Body>
              <h5>Media Heading</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin commodo. Cras purus odio,
                vestibulum in vulputate at,
              </p>
              <Button className="navigation-button" variant="secondary">
                Delete
              </Button>
            </Media.Body>
          </Media>
          <br />
          <hr />
          <Media>
            <img
              width={64}
              height={64}
              className="align-self-start mr-3"
              src="/placeholderSM.svg"
              alt="small placeholder"
            />
            <Media.Body>
              <h5>Media Heading</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin commodo. Cras purus odio,
                vestibulum in vulputate at,
              </p>
              <Button className="navigation-button" variant="secondary">
                Delete
              </Button>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
