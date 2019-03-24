import React from 'react'
import Col from 'react-bootstrap/Col'

export default function IngredientsList(props) {
  const ingredients = props.ingredients || []
  const instructions = props.instructions || ''
  const instructionWords = instructions
    .split(/ |,|\.|;/)
    .map(word => word.toLowerCase())

  const filteredIngredients = ingredients.filter(ingredient => {
    const r = /\b(?:(?!tsp|cup|tbsp|oz|pint|and|if|or|to|large|small|\d)\w)+\b/gi
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

  return ingredientsList.length ? (
    <Col>
      <ul id="ingredients">{ingredientsList.map(i => <li key={i}>{i}</li>)}</ul>
    </Col>
  ) : (
    <p>There are no ingredients in this step</p>
  )
}
