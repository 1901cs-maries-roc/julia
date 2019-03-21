import React from 'react'

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
    <ul id="ingredients">
      {ingredientsList.map(i => (
        <li key={i.id}>
          {i.recipeIngredient.quantity} {i.recipeIngredient.measure} {i.name}
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no ingredients in this step</p>
  )
}
