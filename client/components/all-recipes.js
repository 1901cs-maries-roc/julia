import React, {Component} from 'react'
import AllRecipesCard from './all-recipes-card'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllRecipesThunk} from '../store'
import annyang from 'annyang'
import {nullCommand, help, command} from '../annyangCommands'

export class AllRecipes extends Component {
  componentDidMount() {
    this.props.getAllRecipesThunkDispatch()
  }

  handleClick = () => {
    if (annyang) {
      var commands = {
        'hey julia': nullCommand,
        'hey julia help': help,
        'hey julia *command': command
      }
      annyang.addCommands(commands)
      annyang.start()
    }
  }

  render() {
    return (
      <div>
        <h1>ALL MY RECIPES!</h1>
        <br />
        {this.props.allRecipes.map(recipe => (
          <div key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} onClick={this.handleClick}>
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
