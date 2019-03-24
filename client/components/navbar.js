import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavigationBar = ({handleClick, isLoggedIn}) => (
  // error here: The prop `handleClick` is marked as required in `Bootstrap(undefined)`, but its value is `undefined`.
  // error here: The prop `isLoggedIn` is marked as required in `Bootstrap(undefined)`, but its value is `undefined`.
  <Navbar
    collapseOnSelect
    expand="lg"
    bg="light"
    variant="light"
    className="navbar"
  >
    <Navbar.Brand href="/">
      <img
        alt=""
        src="/juliaicon.png"
        width="140"
        height="80"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/">Recipes</Nav.Link>
        <Nav.Link href="/recipes/addrecipe">Add Recipe</Nav.Link>
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
        {isLoggedIn ? (
          <Nav>
            <NavDropdown title="User" id="collasible-nav-dropdown">
              {/* <NavDropdown.Item href="#">My Account</NavDropdown.Item> */}
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
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

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

NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
