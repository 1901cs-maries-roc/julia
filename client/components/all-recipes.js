import React, {Component} from 'react'
import AllRecipesCard from './all-recipes-card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllRecipesThunk} from '../store'
import axios from 'axios'

export class AllRecipes extends Component {
  async componentDidMount() {
    this.props.getAllRecipesThunkDispatch()
    const {data: res} = await axios.get(
      'https://sallysbakingaddiction.com/best-banana-cake/'
    )
    console.log(res)
  }

  render() {
    return (
      <div>
        <h1>ALL MY RECIPES!</h1>
        <br />
        {this.props.allRecipes.map(recipe => (
          <div key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              {' '}
              <AllRecipesCard recipe={recipe} />
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  console.log('state.recipes', state.recipe.recipes)
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
