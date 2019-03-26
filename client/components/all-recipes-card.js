import React from 'react'
import Card from 'react-bootstrap/Card'

const OneRecipeCard = props => {
  const {recipe} = props
  let name = recipe.name
  if (name.length > 40) {
    name = recipe.name.substring(0, 40)
    console.log('1 ', recipe.name)
    // recipe.name = recipe.name.substring(0, /\s(?=\S*$)/)
    // let reg = /\s(?=\S*$)/
    console.log(name.lastIndexOf(' '))
    console.log(name.substring(0, name.lastIndexOf(' ')))
    name = name.substring(0, name.lastIndexOf(' '))

    console.log('char at ', recipe.name.indexOf)
    console.log(recipe.name.substring(0, /\s(?=\S*$)/))
  }
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" src={recipe.imgUrl} className="img-resize" />
      <Card.Body className="card-body">
        <Card.Text className="card-text">{name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default OneRecipeCard
