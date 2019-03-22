import React from 'react'
import Col from 'react-bootstrap/Col'

export default function IngredientsList(props) {
  const ingredients = props.ingredients || []
  const instructions = props.instructions || ''
  const instructionWords = instructions
    .split(/ |,|\./)
    .map(word => word.toLowerCase())
  const ingredientsList = props.isOverview
    ? ingredients
    : ingredients.filter(i => instructionWords.includes(i.name.toLowerCase()))

  console.log('is ingredientsList? ', ingredientsList.length)
  return ingredientsList.length ? (
    <Col>
      <ul id="ingredients">
        {ingredientsList.map(i => (
          <li key={i.id}>
            {i.recipeIngredient.quantity} {i.recipeIngredient.measure} {i.name}
          </li>
        ))}
      </ul>
    </Col>
  ) : (
    <p>There are no ingredients in this step</p>
  )
}
