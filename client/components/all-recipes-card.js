import React from 'react'
import Card from 'react-bootstrap/Card'

const AllRecipesCard = props => {
  const {recipe} = props
  return (
    <Card style={{width: '18rem', height: '18rem'}}>
      <Card.Img variant="top" src={`${recipe.imgUrl}`} />
      <Card.Body className="card-img-overlay">
        <Card.Title> {recipe.name} </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default AllRecipesCard
