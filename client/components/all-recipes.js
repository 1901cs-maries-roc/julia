import React, {Component} from 'react'
import OneRecipeCard from './all-recipes-card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllRecipesThunk} from '../store'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'

export class AllRecipes extends Component {
  componentDidMount() {
    this.props.getAllRecipesThunkDispatch()
    Axios.post('/api/recipes/scrape', {
      url: 'https://www.tasteofhome.com/recipes/best-lasagna/'
    })
  }

  render() {
    const allRecipes = this.props.allRecipes || []
    const recipe = allRecipes.map(r => {
      return (
        <div key={r.id}>
          <Col>
            <Link to={`/recipes/${r.id}`}>
              {' '}
              <OneRecipeCard recipe={r} />
            </Link>
          </Col>
        </div>
      )
    })

    return (
      <Container className="container">
        <Row>
          <h1>All Recipes</h1>
          <CardGroup>{recipe.length ? recipe : <div>loading</div>}</CardGroup>
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
  }
}

export default connect(mapState, mapDispatch)(AllRecipes)
