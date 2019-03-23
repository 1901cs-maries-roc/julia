import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'

class UserFavorites extends Component {
  // componentDidMount() {
  //   const recipeId = this.props.match.params.recipeId
  //   // this.props.getFavoriteRecipesThunkDispatch(recipeId)
  // }

  render() {
    return (
      <div>
        <Container className="container">
          <h1>Here's my list of favorite Recipes:</h1>
          {console.log('FAVORITE RECIPES LIST: ', this.props.favoriteRecipes)}
        </Container>
      </div>
    )
  }
}

// export default UserFavorites

const mapState = state => {
  return {
    favoriteRecipes: state.recipe.favoriteRecipes
  }
}

// const mapDispatch = dispatch => {
//   return {
//     getFavoriteRecipesThunkDispatch: recipeId => dispatch(getFavoriteRecipe(recipeId))
//   }
// }

export default connect(mapState)(UserFavorites)
