import React from 'react'
import Col from 'react-bootstrap/Col'

export default function IngredientsList(props) {
  const ingredients = props.ingredients || []
  const instructions = props.instructions || ''
  const instructionWords = instructions
    .split(/ |,|\.|;/)
    .map(word => word.toLowerCase())

  const filteredIngredients = ingredients.filter(ingredient => {
    const r = /\b(?:(?!tsp|cup|tbsp|oz|pint|melted|cooled|and|\ba\b|\bif\b|or|\bto\b|large|small|\d)\w)+\b/gi
    let ingWords = ingredient.match(r) || []
    let isRelevantIngredient = false
    for (let ing of ingWords) {
      if (instructionWords.includes(ing)) {
        isRelevantIngredient = true
        break
      }
    }
    return isRelevantIngredient
  })

  const ingredientsList = props.isOverview ? ingredients : filteredIngredients

  return (
    <>
      {ingredientsList.length ? (
        <ul id={props.isOverview ? null : 'ingredients-list'}>
          {ingredientsList.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      ) : (
        <p id="ingredients-list">There are no ingredients in this step</p>
      )}
    </>
  )
}
