import React from 'react'
import Card from 'react-bootstrap/Card'

const AllRecipesCard = props => {
  const {recipe} = props
  return (
    <Card>
      <Card.Img variant="top" src={`${recipe.imgUrl}`} />
      <Card.Body>
        <Card.Title> {recipe.name} </Card.Title>
        <Card.Text>Tags here?</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default AllRecipesCard
