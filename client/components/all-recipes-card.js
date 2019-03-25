import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const OneRecipeCard = props => {
  const {recipe} = props
  return (
    <CardDeck>
      <Card>
        <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
        </Card.Body>
      </Card>
    </CardDeck>
  )
}

export default OneRecipeCard

// style={{width: '18rem'}}
