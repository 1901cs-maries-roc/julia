import React from 'react'
import Card from 'react-bootstrap/Card'

const OneRecipeCard = props => {
  const {recipe} = props
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
      <Card.Body className="test">
        <Card.Text>{recipe.name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard
