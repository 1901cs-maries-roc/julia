import React from 'react'

export default function IngredientsList({ingredients}) {
  const ingredientsList = ingredients || []
  return (
    <ul id="ingredients">
      {ingredientsList.map(i => (
        <li key={i.id}>
          {i.recipeIngredient.quantity} {i.recipeIngredient.measure} {i.name}
        </li>
      ))}
    </ul>
  )
}
