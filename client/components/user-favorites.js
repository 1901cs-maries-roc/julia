import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
// import {connect} from 'react-redux'
// import {addFavoriteRecipe} from '../store'

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
        </Container>
      </div>
    )
  }
}

export default UserFavorites

// const mapState = state => {
//   return {
//     favoriteRecipe: state.recipe.favorite,
//     favortieRecipes: state.recipe.favorites
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getFavoriteRecipesThunkDispatch: recipeId => dispatch(getFavoriteRecipe(recipeId))
//   }
// }

// export default connect(mapState, mapDispatch)(UserFavorites)
