import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const OneRecipeCard = props => {
  const {recipe} = props
  return (
    <Card style={{width: '18rem'}}>
      <Card.Img variant="top" src={`${recipe.imgUrl}`} className="img-resize" />
      <Card.Body>
        <Card.Title>{recipe.name} </Card.Title>
        <Button>
          {' '}
          <i className="fas fa-heart" />
        </Button>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard
