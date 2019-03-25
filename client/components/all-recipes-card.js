import React from 'react'
import Card from 'react-bootstrap/Card'

const OneRecipeCard = props => {
  const {recipe} = props
  return (
    <Card style={{width: '18rem'}}>
      <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard
