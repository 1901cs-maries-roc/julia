import React, {Component} from 'react'
import AllRecipesCard from './all-recipes-card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllRecipesThunk} from '../store'
import axios from 'axios'

export class AllRecipes extends Component {
  async componentDidMount() {
    this.props.getAllRecipesThunkDispatch()
    await axios.post('/api/scrape', {
      url:
        'https://www.allrecipes.com/recipe/162760/fluffy-pancakes/?internalSource=previously%20viewed&referringContentType=Homepage&clickId=cardslot%203'
    })
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
