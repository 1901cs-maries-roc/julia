import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const OneRecipeCard = props => {
  const {recipe} = props
  return (
    <Card>
      <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
      <Card.Body className="test">
        <Card.Text>{recipe.name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard

// style={{width: '18rem'}}
