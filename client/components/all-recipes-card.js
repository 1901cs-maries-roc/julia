import React from 'react'
import Card from 'react-bootstrap/Card'

const OneRecipeCard = props => {
  const {recipe} = props
  let name = recipe.name
  if (name.length > 40) {
    name = recipe.name.substring(0, 40)
    name = name.substring(0, name.lastIndexOf(' '))
  }
  return (
    <Card className="recipe-card" border="white">
      <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
      <Card.Body className="card-body">
        <Card.Text className="card-text">{name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard
