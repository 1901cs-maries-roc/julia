import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {logout} from '../store'
import annyang from 'annyang'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavigationBar = ({handleClick, isLoggedIn}) => (
  // error here: The prop `handleClick` is marked as required in `Bootstrap(undefined)`, but its value is `undefined`.
  // error here: The prop `isLoggedIn` is marked as required in `Bootstrap(undefined)`, but its value is `undefined`.
  <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
    <Navbar.Brand href="/">
      <img
        alt=""
        src="/favicon.ico"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      JULIA
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="Recipes">Recipes</Nav.Link>
        {/* <NavDropdown title="Recipes" id="nav-dropdown">
          <NavDropdown.Item
            href="#action/4.1"
            onClick={() => {
              annyang.abort()
            }}
          >
            Breakfast/Brunch
          </NavDropdown.Item>
          <NavDropdown.Item
            href="#action/4.2"
            onClick={() => {
              annyang.abort()
            }}
          >
            Lunch/Dinner
          </NavDropdown.Item>
          <NavDropdown.Item
            href="#action/4.3"
            onClick={() => {
              annyang.abort()
            }}
          >
            Desserts
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            href="/recipes"
            onClick={() => {
              annyang.abort()
            }}
          >
            All Recipes
          </NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
      {isLoggedIn ? (
        <Nav>
          <NavDropdown title="User" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/home">My Account</NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={handleClick}>
              Logout
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          {/* <Nav.Link href="Favorites">
            <i className="fab fa-gratipay" />
          </Nav.Link> */}
        </Nav>
      ) : (
        <Nav>
          <NavDropdown title="User" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      )}
    </Navbar.Collapse>
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

/**
 * PROP TYPES
 */
NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
