import React, {Component} from 'react'
import AllRecipesCard from './all-recipes-card'
import {Link} from 'react-router-dom'
import {RecipeStep} from '.'

export default class AllRecipes extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>ALL MY RECIPES!</h1>
        <br />
        <Link to="/recipe">
          {' '}
          <AllRecipesCard />
        </Link>
        <br />

        <Link to="/recipe">
          {' '}
          <AllRecipesCard />
        </Link>
        <br />

        <Link to="/recipe">
          {' '}
          <AllRecipesCard />
        </Link>
      </div>
    )
  }
}
