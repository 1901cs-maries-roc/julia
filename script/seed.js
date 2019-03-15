'use strict'

const db = require('../server/db')
const {User, Recipe, Ingredient} = require('../server/db/models')
const {recipeIngredient} = require('../server/db/models/index')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const [superWaffle] = await Promise.all([
    Recipe.create({
      imgUrl:
        'https://www.kitchentreaty.com/wp-content/uploads/2017/05/vegan-vanilla-bean-waffles-image-660x430.jpg',
      name: 'Super Waffle',
      serving: 8,
      prepTime: 15,
      cookTime: 30,
      waitTime: 0,
      steps: [
        '1. Mix flour, melted butter and egg yolk',
        '2. add milk',
        '3. incorporate snow egg'
      ]
    })
  ])

  const [flour, butter] = await Promise.all([
    Ingredient.create({
      name: 'Flour'
    }),
    Ingredient.create({
      name: 'Butter'
    })
  ])

  const recipeIngredient = await Promise.all([
    recipeIngredient.create({
      quantity: '500 g',
      sectionName: '',
      ingredientId: flour.id,
      recipeId: superWaffle.id
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
