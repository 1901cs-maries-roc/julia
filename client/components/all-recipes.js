import React, {Component} from 'react'
import OneRecipeCard from './all-recipes-card'
import {connect} from 'react-redux'
import {getAllRecipesThunk} from '../store'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class AllRecipes extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getAllRecipesThunkDispatch()
  }

  render() {
    return (
      <Container className="container">
        <Row>
          <h1>All Recipes</h1>
          <CardGroup>
            {this.props.allRecipes.map(recipe => (
              <div key={recipe.id}>
                <Col>
                  <OneRecipeCard recipe={recipe} />
                </Col>
              </div>
            ))}
          </CardGroup>
        </Row>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    allRecipes: state.recipe.recipes
  }
}

const mapDispatch = dispatch => {
  return {
    getAllRecipesThunkDispatch: () => dispatch(getAllRecipesThunk())
    // addFavoriteThunkDispatch: (recipe) => dispatch(addFavoriteRecipe(recipe))
  }
}

export default connect(mapState, mapDispatch)(AllRecipes)
