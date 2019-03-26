import React from 'react'
import Card from 'react-bootstrap/Card'

const OneRecipeCard = props => {
  const {recipe} = props
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
      <Card.Body className="card-body">
        <Card.Text className="card-text">{recipe.name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard
