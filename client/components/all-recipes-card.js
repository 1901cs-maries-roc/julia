import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {me, addFavoriteRecipe} from '../store'

// const OneRecipeCard = props => {
//   const {recipe, isLoggedIn/*favoriteClick*/} = props
//   return (
//     <Card style={{width: '18rem'}}>
//         <Card.Link href={`/recipes/${recipe.id}`}><Card.Img variant="top" src={`${recipe.imgUrl}`} className="img-resize" /></Card.Link>
//         <Card.Body>
//           <Card.Link href={`/recipes/${recipe.id}`}><Card.Title>{recipe.name} </Card.Title></Card.Link>
//           {isLoggedIn && (
//              <Card.Link /*onClick={favoriteClick(recipe)}*/><i className="fas fa-heart"/></Card.Link>
//           )}

//         </Card.Body>
//     </Card>
//   )
// }

class OneRecipeCard extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  // componentDidMount() {
  //   this.props.loadInitialData()
  // }

  handleClick(recipe) {
    this.props.addFavorite(recipe)
    console.log('IN HANDLECLICK ON CARD: ', recipe)
  }

  render() {
    const {isLoggedIn} = this.props
    const {recipe} = this.props

    return (
      <div>
        <Card style={{width: '18rem'}}>
          <Card.Link href={`/recipes/${recipe.id}`}>
            <Card.Img
              variant="top"
              src={`${recipe.imgUrl}`}
              className="img-resize"
            />
          </Card.Link>
          <Card.Body>
            <Card.Link href={`/recipes/${recipe.id}`}>
              <Card.Title>{recipe.name} </Card.Title>
            </Card.Link>
            {isLoggedIn && (
              <Button variant="light" onClick={this.handleClick(recipe)}>
                <i className="far fa-heart" />
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me()),
    addFavorite: recipe => dispatch(addFavoriteRecipe(recipe))
  }
}

export default withRouter(connect(mapState, mapDispatch)(OneRecipeCard))

OneRecipeCard.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
