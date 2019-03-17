import React from 'react'

//temporary component, just for code review 1

const AllRecipesCard = props => {
  const {recipe} = props
  console.log('RECIPE CARD', recipe)
  return (
    <div>
      <h2> {recipe.name} </h2>
      <img src={`${recipe.imgUrl}`} />
    </div>
  )
}

export default AllRecipesCard
